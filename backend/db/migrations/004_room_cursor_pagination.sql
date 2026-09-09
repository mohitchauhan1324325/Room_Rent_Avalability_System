CREATE INDEX IF NOT EXISTS rooms_created_id_idx
ON rooms (created_at DESC, id DESC);