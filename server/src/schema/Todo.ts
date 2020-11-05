import {
  Document,
  Schema,
  model,
} from 'mongoose';

interface Todo extends Document {
  description: string;
  done: boolean;
}

const TodoSchema = new Schema({
  description: String,
  done: Boolean,
}, {
  toJSON: { versionKey: false },
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const Todo = model<Todo>('Todo', TodoSchema);

export default Todo;
