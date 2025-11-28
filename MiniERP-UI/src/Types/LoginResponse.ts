//{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0Mjg0NjQxLCJpYXQiOjE3NjQyODEwNDEsImp0aSI6Ijk3YjIzYzllNjI2YTQ4MGM4NTRjOTliMDk3MTMyMWM1IiwidXNlcl9pZCI6MX0.WC6IH6z4P9XolXTGEUieAP-3KKP9fgg61jWPfeJz4pY","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2NDM2NzQ0MSwiaWF0IjoxNzY0MjgxMDQxLCJqdGkiOiJkNmU5YWM1ZGQ4ZmU0ZGIyYWRmMDRkM2ZlMmZiNmNhNiIsInVzZXJfaWQiOjF9.lyB0IOJrDLcajl3o2lUK4qNNxuWUd9UThC-mCDxirK0","user":{"id":1,"username":"string","email":"admin@minierp.com","first_name":"System","last_name":"Administrator","full_name":"System Administrator","phone":"+1234567890","address":"123 Admin Street, City, Country","role":{"id":1,"name":"Administrator","description":"Full system access","created_at":"2023-12-31T18:00:00-03:00","updated_at":"2023-12-31T18:00:00-03:00"},"is_active":true,"created_at":"2023-12-30T15:00:00-03:00","updated_at":"2025-11-14T10:17:09.120199-03:00"}}
import type { User } from "./User"

export type LoginResponse = {
    access_token : string,
    refresh_token : string,
    user : User

}