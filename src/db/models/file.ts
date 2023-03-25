import { PrismaClient } from "@prisma/client";

export interface FileInterface {
  id: string;
  name: string;
  systemName: string;
  url: string;
  path: string;
  ownerId: string;
  folderId: string;
}

export default class File {
  private prisma: any;
  private file: any;

  constructor() {
    this.prisma = new PrismaClient();
    this.file = this.prisma.file;
  }

  async create(file: FileInterface) {
    return await this.file.create({
      data: file,
      select: {
        id: true,
        name: true,
        path: true,
        url: true,
      },
    });
  }

  async findMany() {
    return await this.file.findMany({});
  }

  async findById(id: number) {
    return await this.file.findFirst({
      where: {
        id: { equals: id },
      },
    });
  }

  async findByOwnerId(ownerId: string) {
    return await this.file.findFirst({
      where: {
        ownerId: { equals: ownerId },
      },
    });
  }

  async findByFolderId(folderId: string) {
    return await this.file.findFirst({
      where: {
        folderId: { equals: folderId },
      },
    });
  }

  async update(id: number, name: string, systemName: String, url: string) {
    return await this.file.update({
      where: {
        id: { equals: id },
      },
      data: {
        name: name,
        url: url,
        systemName: systemName,
      },
      select: {
        id: true,
        name: true,
        path: true,
        url: true,
      },
    });
  }

  async delete(id: string) {
    return this.file.delete({
      where: {
        id: { equals: id },
      },
    });
  }
}
