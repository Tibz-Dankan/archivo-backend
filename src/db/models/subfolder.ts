import { PrismaClient } from "@prisma/client";

export interface SubFolderInterface {
  id: string;
  name: string;
  ownerId: string;
  subFolderParentId: string;
}

export default class SubFolder {
  private prisma: any;
  private subFolder: any;

  constructor() {
    this.prisma = new PrismaClient();
    this.subFolder = this.prisma.SubFolder;
  }

  async create(subFolder: SubFolderInterface) {
    return await this.subFolder.create({
      data: subFolder,
      select: {
        id: true,
        name: true,
        ownerId: true,
        subFolderParentId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string) {
    return await this.subFolder.findFirst({
      where: {
        id: { equals: id },
      },
    });
  }

  async findByOwnerId(ownerId: string) {
    return await this.subFolder.findMany({
      where: {
        ownerId: { equals: ownerId },
      },
    });
  }

  async findByParentId(parentId: string) {
    return await this.subFolder.findMany({
      where: {
        subFolderParentId: { equals: parentId },
      },
    });
  }

  async delete(id: string) {
    return this.subFolder.delete({
      where: {
        id: { equals: id },
      },
    });
  }
}
