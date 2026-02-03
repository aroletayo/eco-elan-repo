// /lib/order-id.ts
export function generateOrderId() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `EC${timestamp}${random}`;
}