import {
  Express,
} from 'express';

import Todo from '../schema/Todo';

function escapeRegex(input: string): string {
  // eslint-disable-next-line no-useless-escape
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

const setupRoutes = (prefix: string) => (app: Express) => {
  const url = `${prefix}/todo`;

  app.get(url, async (req, res) => {
    const { description, done } = req.query;
    const descriptionRegex = new RegExp(escapeRegex(String(description)), 'i');
    const filter = {
      ...(done !== undefined && { done: done === 'true' }),
      ...(description !== undefined && { description: descriptionRegex }),
    };
    const todoItems = await Todo.find(filter);

    res.send(todoItems);
  });

  app.get(`${url}/:id`, async (req, res) => {
    const { id } = req.params;
    const todoItem = await Todo.findById(id);

    res.send(todoItem);
  });

  app.delete(url, async (req, res) => {
    await Todo.deleteMany({});

    res.status(204).end();
  });

  app.delete(`${url}/:id`, async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);

    res.status(204).end();
  });

  app.post(url, async (req, res) => {
    const { description } = req.body;

    const todoItem = new Todo({
      description,
      done: false,
    });

    await todoItem.save();

    res.send(todoItem);
  });

  app.put(`${url}/:id`, async (req, res) => {
    const { description, done } = req.body;
    const update = {
      ...(description !== undefined && { description }),
      ...(done !== undefined && { done }),
    };

    const todoItem = await Todo.findByIdAndUpdate(req.params.id, {
      $set: update,
    }, { new: true });

    res.send(todoItem);
  });
};

export default setupRoutes;
