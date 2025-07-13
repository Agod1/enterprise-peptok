import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Coach } from "../../coaches/entities/coach.entity";
import { Session } from "../../sessions/entities/session.entity";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  reviewer: User;

  @Column()
  reviewerId: string;

  @ManyToOne(() => Coach, (coach) => coach.reviews)
  @JoinColumn()
  coach: Coach;

  @Column()
  coachId: string;

  @ManyToOne(() => Session, { nullable: true })
  @JoinColumn()
  session: Session;

  @Column({ nullable: true })
  sessionId: string;

  @Column({ type: "int", minimum: 1, maximum: 5 })
  rating: number;

  @Column({ type: "text" })
  comment: string;

  @Column({ type: "boolean", default: true })
  isPublic: boolean;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
