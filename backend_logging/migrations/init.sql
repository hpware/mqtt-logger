-- Create UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create errorsys table
CREATE TABLE IF NOT EXISTS errorsys (
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL,
    source VARCHAR(255) NOT NULL,
    errormsg TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create mqtt_data table
CREATE TABLE IF NOT EXISTS mqtt_data (
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL,
    topic VARCHAR(255) NOT NULL,
    data TEXT NOT NULL,
    isjson BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_errorsys_uuid ON errorsys(uuid);
CREATE INDEX IF NOT EXISTS idx_errorsys_source ON errorsys(source);
CREATE INDEX IF NOT EXISTS idx_errorsys_created_at ON errorsys(created_at);

CREATE INDEX IF NOT EXISTS idx_mqtt_data_uuid ON mqtt_data(uuid);
CREATE INDEX IF NOT EXISTS idx_mqtt_data_topic ON mqtt_data(topic);
CREATE INDEX IF NOT EXISTS idx_mqtt_data_created_at ON mqtt_data(created_at);
CREATE INDEX IF NOT EXISTS idx_mqtt_data_isjson ON mqtt_data(isjson);

-- Add comments
COMMENT ON TABLE errorsys IS 'System error logs including MQTT and application errors';
COMMENT ON TABLE mqtt_data IS 'MQTT messages with their topics and data';

-- Grant permissions (adjust according to your needs)
-- GRANT SELECT, INSERT ON errorsys TO your_app_user;
-- GRANT SELECT, INSERT ON mqtt_data TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE errorsys_id_seq TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE mqtt_data_id_seq TO your_app_user;
