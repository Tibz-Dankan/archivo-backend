import { PrismaClient } from "@prisma/client";

export interface FolderInterface {
  id: string;
  name: string;
  ownerId: string;
}

export default class Folder {
  private prisma: any;
  private folder: any;

  constructor() {
    this.prisma = new PrismaClient();
    this.folder = this.prisma.folder;
  }

  async create(folder: FolderInterface) {
    return await this.folder.create({
      data: folder,
      select: {
        id: true,
        name: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findMany() {
    return await this.folder.findMany({});
  }

  async findById(id: string) {
    return await this.folder.findFirst({
      where: {
        id: { equals: id },
      },
    });
  }

  async findByOwnerId(ownerId: string) {
    return await this.folder.findMany({
      where: {
        ownerId: { equals: ownerId },
      },
    });
  }

  async delete(id: string) {
    return this.folder.delete({
      where: {
        id: { equals: id },
      },
    });
  }
}
