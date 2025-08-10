import { sql } from "./clients";

await sql`
create table if not exists mqtt_data (
uuid text PRIMARY KEY,
topic text not null,
data text not null,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
`;

await sql`
create table if not exists mqtt_errors (
uuid text primary key,
errormsg text not null,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
`;

process.exit(0);
