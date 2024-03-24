import { Role } from "src/users/domain/enums/role.enum"
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({name: 'users'})
export class User {
    @PrimaryColumn()
    id: string

    @Column({unique: true})
    email: string
    
    @Column()
    password: string
    
    @Column({type: "enum", enum: Role, default: Role.USER})
    role: string
    
    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}