import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import AppUser from '../AppUser/AppUser.entity';

@Entity()
@ObjectType()
export default class Friendship {
  static acceptInvitation: any;
  constructor(invitingUser: AppUser, invitedUsers: AppUser) {
    this.invitingUser = invitingUser;
    this.invitedUsers = invitedUsers;
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => AppUser, (user) => user.invitingUser)
  @Field(() => AppUser)
  invitingUser: AppUser;

  @ManyToOne(() => AppUser, (user) => user.invitedUsers)
  @Field(() => AppUser)
  invitedUsers: AppUser;

  @Column({ default: false })
  @Field()
  acceptInvitation: boolean;
}
