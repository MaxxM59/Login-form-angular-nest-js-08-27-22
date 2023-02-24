import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Exclude } from 'class-transformer';
@Entity('users')
// Prevent from having several identical usernames
@Unique(['email'])
export class UserEntity extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;
   @Column({ unique: true })
   email: string;
   @Column()
   last_name: string;
   @Column()
   first_name: string;
   @Column()
   @Exclude()
   salt: string;
   @Column()
   @Exclude()
   password: string;
}
