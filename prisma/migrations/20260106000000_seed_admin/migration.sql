-- Seed admin user
INSERT INTO "users" (
  "id",
  "name",
  "email",
  "password",
  "role",
  "createdAt",
  "updatedAt"
) VALUES (
  'admin-seed-' || gen_random_uuid()::text,
  'مدیر سیستم',
  'admin@parand.com',
  '$2a$10$RnZJUuAuZr5kV17soLoM.e9x4E.Tob1Gw49bWGr6Ri56w9sbk7v2a',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
