import { db } from "@/db/index";
import { users, projects, categories, tasks } from "@/db/schema";
import { faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

async function seedDatabase() {

  const fakeUser = await db.insert(users).values({
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
  }).returning();
  

  const userId = fakeUser[0].id;


  const fakeProjects = [];
  for (let i = 0; i < 3; i++) {
    const project = await db.insert(projects).values({
      name: faker.commerce.productName(),
      userId,
    }).returning();
    fakeProjects.push(project[0]);
  }

  const fakeCategories = [];
  for (let i = 0; i < 5; i++) {
    const category = await db.insert(categories).values({
      name: faker.commerce.department(),
      userId,
    }).returning();
    fakeCategories.push(category[0]);
  }


  for (let i = 0; i < 10; i++) {
    await db.insert(tasks).values({
      title: faker.hacker.phrase(),
      description: faker.lorem.sentence(),
      priority: randomInt(1, 3),
      status: faker.helpers.arrayElement(["pending", "in-progress", "completed"]),
      dueDate: faker.date.future(),
      projectId: faker.helpers.arrayElement(fakeProjects).id,
      categoryId: faker.helpers.arrayElement(fakeCategories).id,
      userId,
      isCompleted: faker.datatype.boolean(),
    });
  }

}