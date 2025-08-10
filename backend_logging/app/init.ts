import { sql } from "./clients";

await sql`
create table if not exists mqtt_data (
uuid text PRIMARY KEY,
topic text not null,
data text not null,
isjson boolean not null,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
`;

await sql`
create table if not exists errorsys (
uuid text primary key,
source text not null,
errormsg text not null,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
`;

process.exit(0);
