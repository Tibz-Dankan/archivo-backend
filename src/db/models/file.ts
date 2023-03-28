import { PrismaClient } from "@prisma/client";

export interface FileInterface {
  id?: string;
  name: string;
  systemName: string;
  url: string | undefined;
  path: string;
  ownerId: string;
  folderId?: string;
  subFolderId?: string;
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
        systemName: true,
        path: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string) {
    return await this.file.findFirst({
      where: {
        id: { equals: id },
      },
    });
  }

  async findByOwnerId(ownerId: string) {
    return await this.file.findMany({
      where: {
        ownerId: { equals: ownerId },
      },
    });
  }

  async findByFolderId(folderId: string) {
    return await this.file.findMany({
      where: {
        folderId: { equals: folderId },
      },
    });
  }

  async findBySubFolderId(SubFolderId: string) {
    return await this.file.findMany({
      where: {
        subFolderId: { equals: SubFolderId },
      },
    });
  }

  async update(
    id: string,
    name: string,
    systemName: String,
    url: string,
    path: string
  ) {
    return await this.file.update({
      where: {
        id: { equals: id },
      },
      data: {
        name: name,
        url: url,
        systemName: systemName,
        path: path,
      },
      select: {
        id: true,
        name: true,
        systemName: true,
        path: true,
        url: true,
        createdAt: true,
        updatedAt: true,
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
