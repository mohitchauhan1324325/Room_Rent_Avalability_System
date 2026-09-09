ALTER TABLE payment_orders
ADD COLUMN IF NOT EXISTS expires_at
TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '15 minutes');

CREATE INDEX IF NOT EXISTS payment_orders_expiry_idx
ON payment_orders(status, expires_at)
WHERE status = 'created';