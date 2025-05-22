import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Entity,
    PrimaryGeneratedColumn,
    OneToOne, JoinColumn } from "typeorm";
import Employee from "./employee.entity";
import AbstractEntity from "./abstract.entity";

@Entity()
class Address extends AbstractEntity {  
    @Column()
    line1: string;

    @Column()
    pincode: string;

    @OneToOne(() => Employee, (employee) => employee.address)
    employee: Employee;
}

export default Address;