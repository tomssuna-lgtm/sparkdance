# SPARK V4 — Cloudflare Pages

Šī versija ir sagatavota GitHub + Cloudflare Pages + D1.

Svarīgi:
- Cloudflare Pages projektā D1 binding nosaukumam jābūt `DB`.
- Datu tabulas tiek izveidotas automātiski, pirmo reizi atverot `/api/content` vai `/api/leads`.
- `/admin.html` ir redaktora prototips. Pirms publiskas lietošanas tas jāaizsargā ar Cloudflare Access.
- Stripe un R2 bilžu augšupielāde vēl nav pieslēgti; tie būs nākamie moduļi.
