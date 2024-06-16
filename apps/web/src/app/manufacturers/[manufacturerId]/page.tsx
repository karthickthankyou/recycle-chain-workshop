export default function Page({
  params,
}: {
  params: { manufacturerId: string }
}) {
  return <div>Manufacuter {params.manufacturerId}</div>
}
