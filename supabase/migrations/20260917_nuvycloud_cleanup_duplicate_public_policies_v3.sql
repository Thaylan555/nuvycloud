-- The original solarhost schema already ships public read policies for
-- products/plans. Keep those and remove the temporary duplicates created by v1/v2.
drop policy if exists "nuvycloud_public_read_products" on public.solarhost_products;
drop policy if exists "nuvycloud_public_read_plans" on public.solarhost_plans;
