drop policy if exists "nuvycloud_public_read_plans" on public.solarhost_plans;
create policy "nuvycloud_public_read_plans"
on public.solarhost_plans for select
to anon, authenticated
using (
  active = true
  and exists (
    select 1 from public.solarhost_products p
    where p.id = solarhost_plans.product_id and p.active = true
  )
);
