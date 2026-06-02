import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import type { Category } from "@/app/lib/types";

const DATA_PATH = path.join(process.cwd(), "data", "categories.json");

function readCategories(): Category[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Category[];
  } catch {
    return [];
  }
}

function writeCategories(categories: Category[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(categories, null, 2), "utf-8");
}

// GET — fetch all categories (optionally filter enabled only via ?enabled=true)
export async function GET(request: NextRequest) {
  const categories = readCategories();
  const enabledOnly = request.nextUrl.searchParams.get("enabled");

  if (enabledOnly === "true") {
    return Response.json(categories.filter((c) => c.enabled));
  }
  return Response.json(categories);
}

// POST — add a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, description, iconName, color, subcategories } =
      body;

    if (!title || !iconName || !color) {
      return Response.json(
        { error: "title, iconName, and color are required" },
        { status: 400 }
      );
    }

    const categories = readCategories();
    const newCategory: Category = {
      id: crypto.randomUUID(),
      title,
      subtitle: subtitle || "",
      description: description || "",
      iconName,
      color,
      enabled: true,
      subcategories: subcategories || [],
    };

    categories.push(newCategory);
    writeCategories(categories);

    return Response.json(newCategory, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// PUT — update a category (toggle enabled, edit fields)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return Response.json({ error: "id is required" }, { status: 400 });
    }

    const categories = readCategories();
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      return Response.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    categories[index] = { ...categories[index], ...updates };
    writeCategories(categories);

    return Response.json(categories[index]);
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// DELETE — delete a category by id
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return Response.json({ error: "id query param is required" }, { status: 400 });
  }

  const categories = readCategories();
  const filtered = categories.filter((c) => c.id !== id);

  if (filtered.length === categories.length) {
    return Response.json({ error: "Category not found" }, { status: 404 });
  }

  writeCategories(filtered);
  return Response.json({ success: true });
}
