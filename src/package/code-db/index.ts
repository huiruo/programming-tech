import Dexie, { Table } from 'dexie'

interface Ires {
  // 0: error 1: add 2: update
  status: 0 | 1 | 2
  content?: string
}

export interface ICodeAllProperty extends ICode {
  updated_at: Date;
  inserted_at: Date;
}

export interface ICode {
  id: string;
  code: string;
  title: string;
  updated_at?: Date;
  inserted_at?: Date;
}

export class CodeDb extends Dexie {
  code!: Table<ICodeAllProperty>;

  constructor() {
    super('CodeDB');

    this.version(1).stores({
      code: 'id, code, title, inserted_at, updated_at'
    });
  }
}

export const codeDb = new CodeDb();


// 更新现有的 code
export const updateCodeDb = async (id: string, updatedFields: ICode): Promise<void> => {
  try {
    await codeDb.code.update(id, updatedFields);
  } catch (error) {
    console.error('updateCode error', error);
  }
};

export const updateCodeDbWhenNoData = async (id: string, updatedFields: ICode): Promise<Ires> => {
  try {
    const content = await getCodeDb(id)
    if (!content) {
      console.log('%c=add', 'color:red', content)
      await addCodeDb({
        id,
        code: updatedFields.code,
        title: updatedFields.title,
        updated_at: new Date(),
        inserted_at: new Date()
      })

      return {
        status: 1,
        content: updatedFields.code
      }
    } else if (content.code === "\n\n") {
      await codeDb.code.update(id, {
        id,
        code: updatedFields.code,
        title: updatedFields.title,
        updated_at: new Date(),
      });

      return {
        status: 1,
        content: updatedFields.code
      }
    } else {
      return {
        status: 2,
        content: content.code
      }
    }
  } catch (error) {
    console.error('updateCode error', error);
    return {
      status: 0
    }
  }
};

// 添加新的 code
export const addCodeDb = async (code: ICodeAllProperty): Promise<void> => {
  try {
    await codeDb.code.add(code);
  } catch (error) {
    console.error('addCode error', error);
  }
};

// 获取特定的 code 通过 id
export const getCodeDb = async (id: string): Promise<ICode | undefined> => {
  try {
    return await codeDb.code.get(id);
  } catch (error) {
    console.error('getCode error', error);
    return undefined;
  }
};