import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser } from 'src/consts';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser({
    name,
    email,
    password,
  }: CreateUser): Promise<UserDocument> {
    return await this.userModel.create({ name, email, password });
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async findUserById(id: string): Promise<UserDocument> {
    return await this.userModel.findOne({ _id: id });
  }
}
