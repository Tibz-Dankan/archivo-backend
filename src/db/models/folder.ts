import { PrismaClient } from "@prisma/client";

export interface FolderInterface {
  id: string;
  name: string;
  ownerId: string;
  parentId: string;
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
        parentId: true,
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
    return await this.folder.findFirst({
      where: {
        ownerId: { equals: ownerId },
      },
    });
  }

  async findByFolderId(folderId: string) {
    return await this.folder.findFirst({
      where: {
        folderId: { equals: folderId },
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
