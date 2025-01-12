import { getNeeaListItem } from './http';
import { db } from './db';
import { sendMail } from './mail';

export async function start() {
  await db.init();

  const dataArr1 = await getNeeaListItem();
  for (const item of dataArr1) {
    const exist = await db.checkListitem(item.href);
    console.log('exist');
    if (!exist) {
      await db.insertListitem(item);
      await sendMail({
        subject: `${item.domain}新增${item.title}`,
        html: `具体链接${item.href}`,
      });
    }
  }


  
}
