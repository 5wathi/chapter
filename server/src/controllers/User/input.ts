import { InputType, Field } from 'type-graphql';
import { User } from '../../graphql-types';

@InputType()
export class UpdateUserInputs implements Omit<User, 'id' | 'email'> {
  @Field(() => String, { nullable: true })
  name: string;
}
