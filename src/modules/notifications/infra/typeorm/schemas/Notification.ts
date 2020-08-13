import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

// TypeORM documentation for MongoDB entities can be found at: https://typeorm.io/#/mongodb

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
