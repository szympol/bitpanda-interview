import {
  Express,
} from 'express';
import {
  ParsedQs,
} from 'qs';

import { labels as paginationLabels, defaultValues } from '../schema/pagination-config';
import Todo from '../schema/Todo';

function escapeRegex(input: string): string {
  // eslint-disable-next-line no-useless-escape
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

const getPaginationOptions = (query: ParsedQs): {
  limit?: number, offset?: number,
} => {
  const getQueryOption = (name: string): number | undefined => {
    const option = query[name];

    if (Array.isArray(option)) return undefined;

    if (typeof option !== 'string') return undefined;

    return parseInt(option, 10);
  };

  const limitValue = getQueryOption('limit') ?? defaultValues.limit;
  const offsetValue = getQueryOption('offset');

  return {
    ...(limitValue !== undefined && { limit: limitValue }),
    ...(offsetValue !== undefined && { offset: offsetValue }),
  };
};

const setupRoutes = (prefix: string) => (app: Express) => {
  const url = `${prefix}/todo`;

  app.get(url, async (req, res) => {
    const { description, done } = req.query;
    const descriptionRegex = new RegExp(escapeRegex(String(description)), 'i');
    const filter = {
      ...(done !== undefined && { done: done === 'true' }),
      ...(description !== undefined && { description: descriptionRegex }),
    };
    const paginationOptions = {
      ...getPaginationOptions(req.query),
      customLabels: paginationLabels,
    };
    const todoItems = await Todo.paginate(filter, paginationOptions);

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
