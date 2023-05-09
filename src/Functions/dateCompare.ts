export function dateCompare(a: any, b: any) {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}
