import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import { CreateAddressDto } from "../dto/createAddressDto";

@Entity()
class Employee extends AbstractEntity{

    @Column({unique : true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: Number;

    @OneToOne(() => Address, (address) => address.employee, {
      cascade: true,
      onDelete: 'CASCADE'
    })
    @JoinColumn()
    address: CreateAddressDto

    @Column()
    password: string;
  }
  
  export default Employee;
  