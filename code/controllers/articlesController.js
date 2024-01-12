import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const db = new Database(process.env.DB_PATH, { verbose: console.log });

function getToday() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate); // "17-6-2022"
  return currentDate;
}

const tempResponse = {
  meta: {
    date: getToday(),
  },
  data: {
    message: 'this route is not implemented yet',
  },
};

export async function getAllArticles(req, res) {
  try {
    const stmnt = db.prepare("SELECT * FROM articles");
    const rows = stmnt.all();
    const jsonToSend = {
      meta: {
        name: "Articles",
        title: "All articles",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: []
    }
    for (let i = 0; i < rows.length; i++) {
      jsonToSend.data.push(`/articles/${rows[i].id}`)
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllArticlesFromCategory(req, res) {
  try {
    const params = [req.params.category_id];
    const stmnt = db.prepare(`SELECT * FROM articles where category_id = ?`);
    const row = stmnt.get(params);
    const jsonToSend = {
      meta: {
        name: "Articles from category",
        title: "Articles from a specific category",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: row
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getSingleArticle(req, res) {
  try {
    const params = [req.params.id];
    const stmnt = db.prepare(`SELECT * FROM articles where id = ?`);
    const row = stmnt.get(params);
    const jsonToSend = {
      meta: {
        name: "Article",
        title: "Specific article",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: row
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllCategories(req, res) {
  try {
    const stmnt = db.prepare("SELECT * FROM articleCategory");
    const rows = stmnt.all();
    const jsonToSend = {
      meta: {
        name: "Categories",
        title: "All categories",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: []
    }
    for (let i = 0; i < rows.length; i++) {
      jsonToSend.data.push(`/categories/${rows[i].id}`)
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}

export async function getSingleCategory(req, res) {
  try {
    const params = [req.params.id];
    const stmnt = db.prepare(`SELECT * FROM articleCategory where id = ?`);
    const row = stmnt.get(params);
    const jsonToSend = {
      meta: {
        name: "Category",
        title: "Specific category",
        date: getToday(),
        originalUrl: `${req.originalUrl}`,
      },
      data: row
    }
    res.status(200).json(jsonToSend);
  } catch (err) {
    console.log(err);
  }
}