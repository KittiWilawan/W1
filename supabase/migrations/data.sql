SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict fHYRh5BXh1x2N2oT8svSmU4BbF4gmuKQl0mFZBI2h2GK1qwWIDxYTMtfXSQeMtU

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") VALUES
	('25eb0d7b-f9c9-469a-9962-217756291f5c', 'f8bcbfad-2407-400e-b17f-d3f18621810e', 'b2c203dc-5736-4ceb-a9f2-429ffa267dec', 's256', 'm7ecmffGN0cipINwLifER41q6LyaAeH-S8SVez4bCx0', 'email', '', '', '2026-06-04 03:07:59.183384+00', '2026-06-04 03:07:59.183384+00', 'email/signup', NULL, NULL, NULL, NULL, NULL, false),
	('97e34de0-2654-41c9-9085-367ce3d30a9e', '43c9852d-6129-43b9-9701-d06f95909106', 'ff45d570-55c1-4dda-90b5-92a7fabeff5d', 's256', '6vAKkka3DiXUospjTavbSXRTdDZqV9PJR6v-zVKwDW8', 'recovery', '', '', '2026-06-04 08:48:01.650221+00', '2026-06-04 08:48:27.280666+00', 'recovery', '2026-06-04 08:48:27.280618+00', NULL, NULL, NULL, NULL, false),
	('ef0133dd-1abb-48c0-869f-066ef7e8d686', 'bcee14c9-2ce0-413a-866a-3b650de1dac6', '16841ec5-d94d-4c79-b1bc-d9455fa2af79', 's256', 'W5a6NKWbZVy8VqaTYH_UjjctoxwPIRWsaETYyVrzJHI', 'email', '', '', '2026-06-05 02:32:38.671319+00', '2026-06-05 02:33:17.492851+00', 'email/signup', '2026-06-05 02:33:17.4928+00', NULL, NULL, NULL, NULL, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'd0e01889-bc62-4f34-b3f0-d8376b1ae12a', 'authenticated', 'authenticated', 's6652410018@sau.ac.th', '$2a$10$ZS.gjXN4jGxXbLwMvntrl.I4XTEcwxty.PqOvEBIznweFSMg.Z.jG', '2026-06-05 07:23:23.329032+00', NULL, '', '2026-06-05 07:23:01.510618+00', '', NULL, '', '', NULL, '2026-06-05 08:24:21.342892+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d0e01889-bc62-4f34-b3f0-d8376b1ae12a", "role": "normaluser", "email": "s6652410018@sau.ac.th", "phone": "1234567890", "email_verified": true, "phone_verified": false}', NULL, '2026-06-05 07:23:01.444991+00', '2026-06-05 08:24:21.360775+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3205c306-ffae-4ae0-935c-5445fb95a5a3', 'authenticated', 'authenticated', 'kitti.14.wila@gmail.com', '$2a$10$vtGbzL5LIE3bbdhDQuZeM.Q49pJ8HdPK6x5OjVo5.LHkngcrGqMWu', '2026-06-05 08:15:32.536806+00', NULL, '', '2026-06-05 08:15:19.097507+00', '', NULL, '', '', NULL, '2026-06-05 08:43:30.748546+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "3205c306-ffae-4ae0-935c-5445fb95a5a3", "role": "admin", "email": "kitti.14.wila@gmail.com", "phone": "0882312398", "email_verified": true, "phone_verified": false}', NULL, '2026-06-05 08:15:19.048827+00', '2026-06-05 09:41:58.830556+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('d0e01889-bc62-4f34-b3f0-d8376b1ae12a', 'd0e01889-bc62-4f34-b3f0-d8376b1ae12a', '{"sub": "d0e01889-bc62-4f34-b3f0-d8376b1ae12a", "role": "normaluser", "email": "s6652410018@sau.ac.th", "phone": "1234567890", "email_verified": true, "phone_verified": false}', 'email', '2026-06-05 07:23:01.496817+00', '2026-06-05 07:23:01.496896+00', '2026-06-05 07:23:01.496896+00', '8c420dbb-9052-4fef-91f4-5b58e0ac035e'),
	('3205c306-ffae-4ae0-935c-5445fb95a5a3', '3205c306-ffae-4ae0-935c-5445fb95a5a3', '{"sub": "3205c306-ffae-4ae0-935c-5445fb95a5a3", "role": "admin", "email": "kitti.14.wila@gmail.com", "phone": "1234567890", "email_verified": true, "phone_verified": false}', 'email', '2026-06-05 08:15:19.081593+00', '2026-06-05 08:15:19.081653+00', '2026-06-05 08:15:19.081653+00', '282625ae-5a72-4ecb-bfc1-8b9340a2eced');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('e8b0ccba-560b-426d-8d10-54bb19665d3c', '3205c306-ffae-4ae0-935c-5445fb95a5a3', '2026-06-05 08:43:30.749688+00', '2026-06-05 09:41:59.153833+00', NULL, 'aal1', NULL, '2026-06-05 09:41:59.153721', 'node', '125.25.183.243', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('e8b0ccba-560b-426d-8d10-54bb19665d3c', '2026-06-05 08:43:30.802718+00', '2026-06-05 08:43:30.802718+00', 'password', '4270cf3e-b077-48cf-a9ca-f6f1045e69a6');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 29, 'q7ez6f6g4zu6', '3205c306-ffae-4ae0-935c-5445fb95a5a3', true, '2026-06-05 08:43:30.777813+00', '2026-06-05 09:41:58.79833+00', NULL, 'e8b0ccba-560b-426d-8d10-54bb19665d3c'),
	('00000000-0000-0000-0000-000000000000', 30, 'ri6fvr3qffsn', '3205c306-ffae-4ae0-935c-5445fb95a5a3', false, '2026-06-05 09:41:58.818347+00', '2026-06-05 09:41:58.818347+00', 'q7ez6f6g4zu6', 'e8b0ccba-560b-426d-8d10-54bb19665d3c');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."categories" ("id", "title", "subtitle", "description", "icon_name", "color", "enabled", "subcategories") VALUES
	('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Electricity', 'ไฟฟ้า', 'แจ้งเหตุไฟฟ้าขัดข้อง ไฟทางดับ หรือหม้อแปลงมีปัญหา', 'Zap', '#F59E0B', true, '{ไฟดับ,หม้อแปลงระเบิด,ไฟทางดับ,สายไฟขาด,ไฟฟ้าลัดวงจร}'),
	('7c55615d-7630-4982-88e1-b8b08be2c14a', 'Weather', 'สภาพอากาศ', 'แจ้งเหตุสภาพอากาศ', 'Cloud', '#66a1ff', true, '{ฝนตกหนัก,ฟ้าผ่า}');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "email", "phone", "role", "created_at", "display_name", "avatar_url", "address", "bio") VALUES
	('d0e01889-bc62-4f34-b3f0-d8376b1ae12a', 's6652410018@sau.ac.th', '1234567890', 'normaluser', '2026-06-05 07:23:01.442734+00', 'ไร้นาม', 'data:image/jpeg;base64,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', 'บ้านขงเปื่อย เมืองนาติทอง นครเวียงฉัน', 'ข้าพเจ้ามีนามว่าไร้นามหน่วยรบพิเศษนินจาดำ'),
	('3205c306-ffae-4ae0-935c-5445fb95a5a3', 'kitti.14.wila@gmail.com', '0882312398', 'admin', '2026-06-05 08:15:19.046735+00', 'True Admin', 'data:image/png;base64,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', 'Homeless', 'Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin ');


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."reports" ("id", "user_id", "category_id", "category_title", "category_color", "subcategory", "description", "contact", "image", "status", "created_at") VALUES
	('70c52d38-839f-4bbb-8de0-51c8e9b561e1', 'd0e01889-bc62-4f34-b3f0-d8376b1ae12a', '7b6cb6be-44ce-4195-afbd-6a52f94bc71b', 'test (test)', '#135335', 'test2', 'tes', 'est', NULL, 'ขอข้อมูลเพิ่ม', '2026-06-05 07:57:44.12855+00'),
	('640cedfa-3a90-4152-bfd6-c42e001c6942', 'd0e01889-bc62-4f34-b3f0-d8376b1ae12a', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'ไฟฟ้า (Electricity)', '#F59E0B', 'หม้อแปลงระเบิด', 'หม้อแปลงระบิด', 'ไร้นาม', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCACiATcDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAgMAAQQFBgf/xABDEAACAQICBgYIBQIDCAMAAAABAgADEQQhEjFBUXGRBRMyYYGhBiJCUmKxwdEUIzNy8EPhc4LxFRYkNERTkrIlY8L/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EACIRAQEBAQACAgICAwAAAAAAAAABEQIhMRJRA0ETkWFxgf/aAAwDAQACEQMRAD8A+dqIaiALfz7w1HfLQNRDUQBddl/nPR0vQ/pGvUp08NWwFdqlJaq9VVJshYAMbgZXJPBTrIAL0Y4KiMUTo9I9BYvovB4bE4l6GhXtoLTYlswTcggADI7TOeojgWohgSKIaiMkAlgSAQ1EAoCEBLAlgRhAIaiQCWBA1WEu3fCAkAgCMPVeqawYD8uoVFtwtrvHrM+AH52L/wAU/ITZoxT0YbQgJAv81wwPh+sBgQIQENQsgEVp4ECQiHaXaSrAAQWEbaCwgeFkQSIZEoiLRgCJVozRlERaeF2lEQyIJEAEiCRDIlERgoiQiGRKIioKIgkRpEEiIFESQ2EkQccTpdBLgT0xQ/2rTaphLsaire59U2uQQbA2OW6c5R3wgD8M0ZzN8vX0h6N6bI/R7dWuJYq35hdqAUkAAuRctZcyMszY5zdTxHo9SyVukPVqroHrKgC0hVVwlg1/VGla2ognWQZ4VR3fKEtv9RaTl+17x9V7bGYjoLE4KvQqvj6nqqaKs9RqdNlW5IVmJAJJFiCQAdQN5ZHoj19V1wdVKOiAFvUvcM1yBpAAlbWJNr6wLGeOUD4YaiPL9jePqooOjrvxH1H2jFJ9zkfvaUEHu8sjzhKnulvn85bJYYe1pDiCBz1Ri6Ldk34QVFTep8CPOXbS7VO/I+ZtHpYMCEBAy3uOdvO4hLduzUU+FzzB+kNGCAhKII6z3ORz87QgdHtBh4E/K8DEBLAlB0bLTXhfPlGAQNjwQ/4jGf4nzAm1RMeCH/GY0fGPNZvAil8HitGWolgQwIaatGTR74UoxWnIrw+ssSwJRA3RU4hEWYbA75R9XtD6ydVgbSiIQPuyiIjARIRClGACRBIhkSERkURBIjSIJEWjAEQSIZEoiLRhZEFobCA0DLaSGRJBLjAQ1EpRDAmjNYjFEFRDUQCwo3LGKn7uZ+UpRGKIBFU7+YH0tDAqfCeY+8iiMWAxQJ9xvC33lhx8XI/OEBCAj0YpWpt7a8xeGUDdoKeIkAlrTp+4o4Cx5iPSRaY+IcCQOQhBD77eIFvlLWn3vzJ+cy4vE1cNisPTV9IVzY6QBAzAFrW374W4bVo1Pa0D3WI+8gp//Xb/AAzb7Q1JX9RPFcxy1+RhqQ3ZKm3lFokc/B5dIY0Xqj1lOQ0j2TrNjNumF/rUuByJ8/pOWcXTwfS+J61yNJk2E5BTfVxE6mIfTwFWpSOTU2Kkbbi4OcUqsMUv7i+DZ+YhFyufVv5HyBJnM6GNMdGoxqhDc+0BtOsHI8SJsOOw6ZHE0G/a4B5E/XwhokMo4ihX/RdSw1jMEWyORzjlE4no81JqVeixQnT0gO61ri87IUr2X8DmOev5xb4ODMG0mno/qC3frHPZ42kuNa5qfOLVYoymhXlMIjDbSlEd/wBYQEu0KC7d0gjAJCItGAIlERhWAwbdeLTwsiCRDYwSIyARAaMIgEQADBtGGAYABEksyRByFEICCphKZoyGIaiCohKIyMWGogqIxYGNRDUSlhrEYlEsCQCGoj0YtRCAlAQlEejEAnO6Uw2Lr4qg9BFITNSbZG987nVkOc6iiGoivkY5PVdNP/WoU/AH6GSpg+kwmnUxoaxF9BcwN4yBPAaxfXqPXEsCKjHjukKZpYt1aua7EA9YfaBAIN7nZadKj0ZQfCUalWpXZnUaKgixJG+xsBtOwCJ9IqCUsYjotmqLpNuve2Q2Ts9Ep/wFGoxuSgA3ADYOVydthuFkJPLPR6EwXVLcNUNs20iAT4bJpp9EdHj/AKZfEk/MzW1MNnb1t4yPMZygHHZN+4/cauRjVgKWCw1DS6qgg0u1kOXCHokdl24HMffzll/eDDzHMfW0gIbNTfhqk6eRC59pG4jMffygWptnTPip29+w+MZaC1MNno+tv1HmM4jCDUX4/I/Y+UsMGa2ptxyJ4b/CEtN17Jv3H7j7GEQujaoll7xcc93G0LRigssLLWntpv6uz2gf7cCJdyvaTxXPy18rydPFWkMoMG7J1axtHEbJd4GFoJEuUYADCLKiNYQSItLCWBgGOYRbGUASjI0AiBIZIJkgWuSsYsUCdqN4Z/38oxXDZX9bdt5S9ZjUCGo72lAQxDRglB3w1vu85Sw1hpyGKe5v5whqR/rl84CxyxWqkWohqIAUbl5Rir+7mYvkeCUQwJSg7+YH0lgH4TzH3j0YICEJQvu5EfW0tT3NyP0j+QwVpYlaQ3r/AOUuTehI876Uj86h+0/MTq9DNpdE4fgRyJE5fpOPzMOb3uG3ZZiM6KxpwmFwyVVY0Khb8y+SG5FrW1ajnvPgfop7d2SSS0NXiiYOgGa9vW3jI8xnDAjAItGFqhXstfiPqP7w1uvaRuI9YeWflGAQrSdOQCkN2Sptr3jjul2kZA3aCm2q41cN0rqz7LtwOY8b5+cNPFNTGlfUd4yJ4ka/GCwddqnjkeY+0O1T3L8DnyOrnKZh7WX7suV9fhFp4Q5DfqJbvIuB33GrykCnRvTe69/rDwOvzMcw0ZTUw2dvW3jIniRDSwq5XtJ4j1h9/KWCG7LKbbtksq69k34j6jVyMBvW/Up8CM7cCMxyiNGMBpYGl+nUvbYc7fXmYLEr2k5Zj7+UZAYQGEPSDZKfDaOIgsI5UlMIJEYwgkR6MKIkhNJHpOKvwvfkflaHnqZFK91j5GVoBu0PvLVPddh43+d5es1jQXa9PmAOeUcunrDI68vMX+UFetX3DzH3lkDtNRYd4FzzGcRmK5XtI3EesPLPyjEemzWV10t23kc4hSNK1Os1/dJBPiDnHEVGWxFKoNxuPI3vC0o0KI1RMagL7Fans9W5HgASPKNSodKy10PcwsTytblJq41gQ1EQKlVe1Rb/ACkEDnY+UtcRS9p9DZ6wKk8L2vEpqENRFqYxYBYEIShI0Apm0spSqPdX6yCEBFp44HpP/wBN2va1kndvl0Fpv6LsarZJpFb7GubW43t4mX6Uj1MMe9x8vtOe2Kp/7ETCq7dZ1pYgDK1t/G3KXPTO+LXao9IUcB0Zhmrv1yuLL1eZsAAddrW1b8/GbsJjsNjKatSqBWJI0WIDazsvttPO4GnhcXhPwbkpidItTOxiRkvcDYbtk5jo1N2SoLMpIIOsEbIs0fKx9ACwgJ5Xo/p6rhqehXBrKOydIAjuN73HnOng/SShWqilVovT0mABBDAk5C4yI17LybLGk6ldoCEBAOJw4rjDmqBWYaSociR3cjyM0WmdrSQsLCAhaMqK9HirQGhMYJENGENST2Rbhcc7a/GCVf378RnzFrcpo0JRWHyL4sxL+0nJrj6HylaY1Xs245E+BmggQGAh8hhDoG7Qvby4RTIfZLeOY88/OOamPZFuDEDkMoDA+/zA+lpUqbCXB9pFf+bj94tiF2snHVzP0McxO7kfvaLZx8Q8Dbnqj0qWSfhPDLyP3gMw9rLjkOeqERTbNdHiNfMQWB9l+eY+8pKjJAYdy8QbE/zjJGTmgSxIDJeVGdGpjVEUpjFMdglHohsmF+OqRaNP2dJLe6SByGUtTGrJtUipVXs1v/JQQOVof5upqaOvHX4EW85FjFMVOEgU1/o1qdvdvbkpI5w1caVlxS6R9moB8sjHAy+1k2cRlrh/do0s8y1NjTJ5feMU1FzviE7mQOOOVzzMi4eh7NNUvtX1SfEWMYtE+zXrJ4hv/YGGjFLiDpBNPDu27SKHwBv84w1tH9SjWT/Lpf8AreVoV9XWUiu5qdyfEEDygigV7OGpBd9KoUJPAAfOK05KNa1Jm0FqJpe7cA8jnGgTMyO2TJiQu46Dg8yTFqiJkvqW2LTqUh4kXB5Rapi9KF/Iw7bmI5gfaefpqDUUMfVOu2u2udjp2tpU6dPrdM6RNhUDAWFtYANzfbunJomzpYZ3OvUcsh/N8059MuvbXQWj+IT8Otc1lcaI0hYkHK2XdG9JYbEBxjscugKzWspBJsBnllYjb5RfR9UL0thtJPVV72tcljtsNt7W4CdT0lqq2GopZ1tULDSQrkRna4F7HdsIhblkEkstcInD+zRqFdhLi/jYQC6ippUgU1EZ3II2g5bYm8keJ1tw9DFdI4phTLVKuiWJZs7Abz4AcRO50X069E/hektKm6nRFQixHcQdXEDjvh+h6lmxKaAKWVusF76WxcxsufEbQZ2elehsN0jT/M9SsBZagGY3AjaO7laZdd8y5W3PNzZfJ6uWVWXRdTmpXaDu2W8YWkPaybvy5b55ShiekPRzELh8SnWYZiSADkRtKnYd4PiM56nB4vDY+h1uHfTGojaDuI2GZdSzz+vtrz1L49UywkNpGUezpDhq5aotrrsU8MjyP3kapbEQGIlMw9rLjl/rKMqCqYxbGWxgMZURQsYBkYxbGVE2haCxlsYppUK0LAN2gp4wGH7uZty1QmMWxjiao338x9rSQTJKwtcwNLBi7yB5cZHqYamJUximOg9TDUxSmGpkqOUximIUxqmFEOUw1MWplgyVQ9TGLEKY5TI6XDFjFMWphqZnaqCvKYimrPa9gTxsLyWkYFlYbxbPVnJ1Tw+MxNTFYp61Qk6RNrm9hfIeEqlTYUfxFgUWoFI3kgkfIwaylKzoy6BDEFdds9XhOh0ZTr4nCYvCYekr6YVySwGjok6gdZN7bJ17kc0m07oZaFbG9biqTLT0SFIvYE7yNgF+YmrprC0HoUx0dTrOQx0gA5AFteYtr2zRgeicbQpaFQYKpfP85S5UW1DUAJsHRVbf0el/dwan5mY3ubutZzczHiqtJ6T6FRGQ67MLGx1Rc9mno3TNRhUr9/q0VUEd1wbZ38oxPRfo8Ndqlc7O0APISv5uYn+KvP8A+8HSgTQ/E27wig8Mh/ea8L6R12xLPi3C0yCNEKSASAMgSdgPM78u2PRvonRt1L6W8ucuRnBX0fq4vG4mnhHUUKLlVdiCCQRllnkDmbHMd8U6/H1vjDvPcz9ulgMZhsTgKlHHYnDVlLW0a7FGIAABBJOZAvlqJOc5Lhuj8ca3RFVqiU10msQ1hfPSKkgjMZ5cAc50ui/Rd6WI08eykIQyik5FyDlc21HwOU7SdHdR/wAliKlFf+2bOnI5gdwIkX8nPN8Xd/pU566k2ZjN0T03h+kkVHtRxPuXybvB28NY79c6LTzfS3QNZm/EYKimncFlpNYE7wDqN9gJ8Nquj+mq1Kp+H6QrVKbA6IZ1BAPxCwPiDx3ybxOvPN/4udWeOv7ekYxTAezlw1ctUDrKuje1KovvU2tfgDl5xbVh/UR04qSBxIuPOTIq0TE/CfIxbVBw4/fVLV0qfpur8CD8oLTSIqiYpjLZe60Bg0qYVUxi2MJjMz6VeoUUstJLA2NixIBtfYACNW+VEVdWslP9R1HE58oo1y36dNz3nIeeuNShST9Omobft8Sc5GEewvJBFc9p1TuVbnmftJHESQ0sccGWBAU96wwZrkZbRgQ1iwe6ErRZD2nKYYMSrD+ZQ1ZW2xXwcumq0chiVEapkbq8w9TCEUDCBhg09TGLM6mW1bq10/WPAEnPuEm82nOo2qYNXFUqFPrKjqBYneSBrsNtpiwuJqYn120RTtosDfMkXuD4gWI+s5nTD0nqpSwyB9BTdVGSG5BAA1ZgH/UxTjblO9+PDsJ0xh+pLsHVdYDKASNV8yB57YVPpMumlTwz1Bt6tgQtzax231G1vkZ5Wo5aqB1j1EWxubnZnYHUL3jjjalJ2XD1ClMkMVBIFwNW+2sW1Sr+KJn5KDpUf/J4nvqMeZnR9G2KVaz6WQ0V0dhJJA+3jfZOK7abls7kkkk3JM7XowqVK2Jp1BdWpi4352+srvxwXN3p6tX0lUrtzhq0w4R29emzs9mNmKgBrHO1txuOIM2KZxWY6pdEx9v3df7dv38I0RamZKld3dsDhGs6206gzFJTq8SMgO657yc6V6wytUq4qu2Ew5KIuVesNa/CD7xGs7Ad5EbTpJh8YlNBoU6lPRAFgAVzAA3kE8oyhTpYaitGkLIvM7SSdpJzJgY4hcP1vtUWFQZXNhrAG8gkeMrP1PRbfbVaCZARJeZ/FfyCwnO6U6Iw/SK3b1KwFlqAZ8CNo/gnTktK53m7C6ssyvCj8V0NiRSxSWS5Pq29YbSDa/hceE9BhS2Ioithq/WJqNmFwdxDXIP+YTqYvC0cVRalXpq6HfrB3g7D3ieSxuExXQFcVsJWJosbXt5MNR7j8pvOp349Vll5/wBO3VTS/Xp0iw/7iFQP82Yv4wRTp6N6Yq6PvU6gYeAJPyiuiumqeMpqlUqmJF7jUG7x4bJqqpTdtPq10vetnz1yLvNyrmWbGZm0f69u+qlvtBvUbs9U67wxHlY/OMak6/pvVHjf53metTOup1R/cmfO/wBJfN1NRqh9qi/gQR87zPScaVXJ+2fZO4bRBL+ta3/jUI8rARNFjpVdHre2dVtw13zvLkRa0tWC+3zFok4gdZoXXVfSDA7cxbxEoGoubFvGmT8jEYo1Gz9lc7BSCRtBNtVryoVaDUW1znfVukmJWpnsra+6w+xklYnWbwkA7m/nCCKnrW8YQaPU4NR+7+cYxT8fygKYYPc0BRrfevL+8ME7l5/2ihbd5Q1I3+cAYv7PlGqe5h4n6GJXj53+cap728oqcMUj4/P6xilG/qc7faKB+JeR+8rrh7655bRY+Ik3yfpoUfGv88YnHVHoUesFYJsCqtwx789VsvETDjNMoobsnK+lfVqvbM7PKIq12qUOqrldIZq2jmdeVx4Q55v2L1/gTVrYe6ldKopVilhcd4I18DymIMUbSV7G2sXB4Q6baPel81uQDYbf5vimN2vvzloXpm977LeVpRJOcqQxhc6XQmJ/D43NmAcBTogHWRrvs32znMvGU6jppaBI0hY22i4NuYELJZlOXLrvJ02lWlUpqho1EDPRqCxsQCbEHVcDvzM9DSq06lNXXSzG3WN4PfPAUleo+jT16JOsDIAk+V56HC9LVH/LpoorNYWbUCR2r7rWuN9rayZj3+KX0vnuz27WIxT6Qw+G0evYXucwg3kbe4bT3Xh0KSYWiop6WRJdjmWJ1knab2PhaZcKPw1Pss7s2k75Esd5+gAyEf8Aie9Rxyv4GZ2Z4jSXfNbVML+cZip4gr6nu5cRsP8ANxhfiJnZVS6PBPo4fqr50Saeu5sNRJ3kEHxmjS+Kc3r9DG7dGqt+4MMj4kEco8Voupd05mNReVp98z9csBsQi7YTaLjUakVVZHVkqIpDCxBFwRuIMyti13tFNjQuyVOaWuP0n0N1LfiMDpaAzNPO622g6yPMd8d0X6QHRWjjCL6hU3/u+/PfNj4/1fVnGxuHSuzVEsKms7m/v3zfmfKZ0zvi7Her486P5ZXSPkJz69WpWa9R7/ITi4fF1MO3V1LlRlbaOE3iuHW4NwY5xOfQvWnKQrSqVZF65V98kd2Q+0SWLRNMHrKuTax8o7N9p3PTU1WLapAK1N0EiVJBdRm0pJREkaXNbtQqX6kkkEtSwmkkhDpi9mGJJIBQjFUaOoSSRHELHeZkxOzx+QkkhBWQfpr+77QDJJKJQkMkkCSSSSASSSSAPwX/ADK8G+RnoMCBpY02F9IZ+AkkkdKjY/qdn1eGUeJJJjWkZ63qM2h6vqjVltjk7K8JJJN9Lnsuv2qP+J/+TDaSSJRVSK96SSVPSaF/ZmepJJLiaSYBkklxDD0hrSTo79X+bxJJKvpM9uyvZiP61b9w+Ukkz/bSlvAMkkuJpTSSSSif/9k=', 'เสร็จสิ้น', '2026-06-05 08:39:57.05114+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 30, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict fHYRh5BXh1x2N2oT8svSmU4BbF4gmuKQl0mFZBI2h2GK1qwWIDxYTMtfXSQeMtU

RESET ALL;
