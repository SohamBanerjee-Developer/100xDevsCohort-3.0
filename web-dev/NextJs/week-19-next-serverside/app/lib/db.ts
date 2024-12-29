import { PrismaClient } from '@prisma/client'


//@ts-ignore
const prisma = globalThis.prisma ?? new PrismaClient()
//initially prisma will be intialized as a instance of new PrismaClien() as the globalThis.prisma will be empty
// then on next HMRs it will refer to globalThis.Prisma, globalThis.Prisma was assigned to new PrismaClient() in the
// next line //globaltThis is like window object for server

//@ts-ignore
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
//globalThis.Prisma will refer to prisma which is an instance/object of new PrismaClient() 
//when it is not in production i.e in development

export default prisma

// in this way we can avoid multiple connection to databases