import { Db, MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://aadad:${process.env.DB_PASSWORD}@cluster0.lf4bx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export class DB {
  public client: MongoClient;
  public database: Db;
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.database = this.client.db('education');
  }

  async init() {
    await this.client.connect();
    console.log('client init');
  }

  async close() {
    await this.client.close();
  }

  async checkListitem(href) {
    try {
      const collection = this.database.collection('listitem');
      const result = await collection.findOne({ href });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async insertListitem(data: { title: string; domain: string; href: string }) {
    try {
      const collection = this.database.collection('listitem');
      const doc = data;
      const result = await collection.insertOne(doc);
      console.log(`成功插入文档，ID: ${result.insertedId}`);
    } catch (error) {
      console.error('创建数据库失败:', error);
    }
  }

  async insertPage(data: { content: string; domain: string; href: string }) {
    try {
      const collection = this.database.collection('page');
      const doc = data;
      const result = await collection.insertOne(doc);
      console.log(`成功插入文档，ID: ${result.insertedId}`);
    } catch (error) {
      console.error('创建数据库失败:', error);
    }
  }
}

export const db = new DB();
