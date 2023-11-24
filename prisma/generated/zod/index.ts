import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const ChannelScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','youtubeId','createdById']);

export const MediaScalarFieldEnumSchema = z.enum(['id','title','description','type','url','width','height','audio_stream','video_stream','duration','video_codec','audio_codec','key','createdAt','updatedAt','userId']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','parentTagId']);

export const GeneratedVideoScalarFieldEnumSchema = z.enum(['id','title','description','thumbnail','url','algorithm','createdAt','updatedAt','userId','channelId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const MediaTypeSchema = z.enum(['VIDEO','AUDIO','IMAGE','TEXT']);

export type MediaTypeType = `${z.infer<typeof MediaTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// CHANNEL SCHEMA
/////////////////////////////////////////

export const ChannelSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  youtubeId: z.string(),
  createdById: z.string(),
})

export type Channel = z.infer<typeof ChannelSchema>

/////////////////////////////////////////
// MEDIA SCHEMA
/////////////////////////////////////////

export const MediaSchema = z.object({
  type: MediaTypeSchema,
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string().nullable(),
  width: z.number().int().nullable(),
  height: z.number().int().nullable(),
  audio_stream: z.string().nullable(),
  video_stream: z.string().nullable(),
  duration: z.number().int().nullable(),
  video_codec: JsonValueSchema,
  audio_codec: JsonValueSchema,
  key: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Media = z.infer<typeof MediaSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  parentTagId: z.string().nullable(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// GENERATED VIDEO SCHEMA
/////////////////////////////////////////

export const GeneratedVideoSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().nullable(),
  thumbnail: z.string().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  channelId: z.string(),
})

export type GeneratedVideo = z.infer<typeof GeneratedVideoSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  channels: z.union([z.boolean(),z.lazy(() => ChannelFindManyArgsSchema)]).optional(),
  medis: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  generatedVideos: z.union([z.boolean(),z.lazy(() => GeneratedVideoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  channels: z.boolean().optional(),
  medis: z.boolean().optional(),
  generatedVideos: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  channels: z.union([z.boolean(),z.lazy(() => ChannelFindManyArgsSchema)]).optional(),
  medis: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  generatedVideos: z.union([z.boolean(),z.lazy(() => GeneratedVideoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// CHANNEL
//------------------------------------------------------

export const ChannelIncludeSchema: z.ZodType<Prisma.ChannelInclude> = z.object({
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  generatedVideos: z.union([z.boolean(),z.lazy(() => GeneratedVideoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChannelCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ChannelArgsSchema: z.ZodType<Prisma.ChannelDefaultArgs> = z.object({
  select: z.lazy(() => ChannelSelectSchema).optional(),
  include: z.lazy(() => ChannelIncludeSchema).optional(),
}).strict();

export const ChannelCountOutputTypeArgsSchema: z.ZodType<Prisma.ChannelCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ChannelCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ChannelCountOutputTypeSelectSchema: z.ZodType<Prisma.ChannelCountOutputTypeSelect> = z.object({
  generatedVideos: z.boolean().optional(),
}).strict();

export const ChannelSelectSchema: z.ZodType<Prisma.ChannelSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  youtubeId: z.boolean().optional(),
  createdById: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  generatedVideos: z.union([z.boolean(),z.lazy(() => GeneratedVideoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChannelCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEDIA
//------------------------------------------------------

export const MediaIncludeSchema: z.ZodType<Prisma.MediaInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  generatedVideos: z.union([z.boolean(),z.lazy(() => GeneratedVideoFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MediaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MediaArgsSchema: z.ZodType<Prisma.MediaDefaultArgs> = z.object({
  select: z.lazy(() => MediaSelectSchema).optional(),
  include: z.lazy(() => MediaIncludeSchema).optional(),
}).strict();

export const MediaCountOutputTypeArgsSchema: z.ZodType<Prisma.MediaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MediaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MediaCountOutputTypeSelectSchema: z.ZodType<Prisma.MediaCountOutputTypeSelect> = z.object({
  generatedVideos: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const MediaSelectSchema: z.ZodType<Prisma.MediaSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  type: z.boolean().optional(),
  url: z.boolean().optional(),
  width: z.boolean().optional(),
  height: z.boolean().optional(),
  audio_stream: z.boolean().optional(),
  video_stream: z.boolean().optional(),
  duration: z.boolean().optional(),
  video_codec: z.boolean().optional(),
  audio_codec: z.boolean().optional(),
  key: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  generatedVideos: z.union([z.boolean(),z.lazy(() => GeneratedVideoFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MediaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  media: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  parentTag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  childTags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  media: z.boolean().optional(),
  childTags: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  parentTagId: z.boolean().optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  parentTag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  childTags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// GENERATED VIDEO
//------------------------------------------------------

export const GeneratedVideoIncludeSchema: z.ZodType<Prisma.GeneratedVideoInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  channel: z.union([z.boolean(),z.lazy(() => ChannelArgsSchema)]).optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GeneratedVideoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GeneratedVideoArgsSchema: z.ZodType<Prisma.GeneratedVideoDefaultArgs> = z.object({
  select: z.lazy(() => GeneratedVideoSelectSchema).optional(),
  include: z.lazy(() => GeneratedVideoIncludeSchema).optional(),
}).strict();

export const GeneratedVideoCountOutputTypeArgsSchema: z.ZodType<Prisma.GeneratedVideoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GeneratedVideoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GeneratedVideoCountOutputTypeSelectSchema: z.ZodType<Prisma.GeneratedVideoCountOutputTypeSelect> = z.object({
  media: z.boolean().optional(),
}).strict();

export const GeneratedVideoSelectSchema: z.ZodType<Prisma.GeneratedVideoSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  thumbnail: z.boolean().optional(),
  url: z.boolean().optional(),
  algorithm: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  channelId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  channel: z.union([z.boolean(),z.lazy(() => ChannelArgsSchema)]).optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GeneratedVideoCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  channels: z.lazy(() => ChannelListRelationFilterSchema).optional(),
  medis: z.lazy(() => MediaListRelationFilterSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  channels: z.lazy(() => ChannelOrderByRelationAggregateInputSchema).optional(),
  medis: z.lazy(() => MediaOrderByRelationAggregateInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  channels: z.lazy(() => ChannelListRelationFilterSchema).optional(),
  medis: z.lazy(() => MediaListRelationFilterSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChannelWhereInputSchema: z.ZodType<Prisma.ChannelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChannelWhereInputSchema),z.lazy(() => ChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChannelWhereInputSchema),z.lazy(() => ChannelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  youtubeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoListRelationFilterSchema).optional()
}).strict();

export const ChannelOrderByWithRelationInputSchema: z.ZodType<Prisma.ChannelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  youtubeId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ChannelWhereUniqueInputSchema: z.ZodType<Prisma.ChannelWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ChannelWhereInputSchema),z.lazy(() => ChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChannelWhereInputSchema),z.lazy(() => ChannelWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  youtubeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoListRelationFilterSchema).optional()
}).strict());

export const ChannelOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChannelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  youtubeId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChannelCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChannelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChannelMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChannelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChannelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => ChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  youtubeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MediaWhereInputSchema: z.ZodType<Prisma.MediaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumMediaTypeFilterSchema),z.lazy(() => MediaTypeSchema) ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  width: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  height: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  audio_stream: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video_stream: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  video_codec: z.lazy(() => JsonNullableFilterSchema).optional(),
  audio_codec: z.lazy(() => JsonNullableFilterSchema).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoListRelationFilterSchema).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict();

export const MediaOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  width: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  height: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio_stream: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video_stream: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  duration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video_codec: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio_codec: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MediaWhereUniqueInputSchema: z.ZodType<Prisma.MediaWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    key: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    key: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  key: z.string().optional(),
  AND: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumMediaTypeFilterSchema),z.lazy(() => MediaTypeSchema) ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  width: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  height: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  audio_stream: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video_stream: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  video_codec: z.lazy(() => JsonNullableFilterSchema).optional(),
  audio_codec: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoListRelationFilterSchema).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict());

export const MediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  width: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  height: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio_stream: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video_stream: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  duration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video_codec: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio_codec: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MediaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MediaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MediaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MediaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MediaSumOrderByAggregateInputSchema).optional()
}).strict();

export const MediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumMediaTypeWithAggregatesFilterSchema),z.lazy(() => MediaTypeSchema) ]).optional(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  width: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  height: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  audio_stream: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  video_stream: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  video_codec: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  audio_codec: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parentTagId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  media: z.lazy(() => MediaListRelationFilterSchema).optional(),
  parentTag: z.union([ z.lazy(() => TagNullableRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional().nullable(),
  childTags: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  parentTagId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  media: z.lazy(() => MediaOrderByRelationAggregateInputSchema).optional(),
  parentTag: z.lazy(() => TagOrderByWithRelationInputSchema).optional(),
  childTags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  parentTagId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  media: z.lazy(() => MediaListRelationFilterSchema).optional(),
  parentTag: z.union([ z.lazy(() => TagNullableRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional().nullable(),
  childTags: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  parentTagId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  parentTagId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const GeneratedVideoWhereInputSchema: z.ZodType<Prisma.GeneratedVideoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GeneratedVideoWhereInputSchema),z.lazy(() => GeneratedVideoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GeneratedVideoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GeneratedVideoWhereInputSchema),z.lazy(() => GeneratedVideoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  algorithm: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  channel: z.union([ z.lazy(() => ChannelRelationFilterSchema),z.lazy(() => ChannelWhereInputSchema) ]).optional(),
  media: z.lazy(() => MediaListRelationFilterSchema).optional()
}).strict();

export const GeneratedVideoOrderByWithRelationInputSchema: z.ZodType<Prisma.GeneratedVideoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  thumbnail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  algorithm: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  channel: z.lazy(() => ChannelOrderByWithRelationInputSchema).optional(),
  media: z.lazy(() => MediaOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GeneratedVideoWhereUniqueInputSchema: z.ZodType<Prisma.GeneratedVideoWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => GeneratedVideoWhereInputSchema),z.lazy(() => GeneratedVideoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GeneratedVideoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GeneratedVideoWhereInputSchema),z.lazy(() => GeneratedVideoWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  algorithm: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  channel: z.union([ z.lazy(() => ChannelRelationFilterSchema),z.lazy(() => ChannelWhereInputSchema) ]).optional(),
  media: z.lazy(() => MediaListRelationFilterSchema).optional()
}).strict());

export const GeneratedVideoOrderByWithAggregationInputSchema: z.ZodType<Prisma.GeneratedVideoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  thumbnail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  algorithm: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GeneratedVideoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GeneratedVideoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GeneratedVideoMinOrderByAggregateInputSchema).optional()
}).strict();

export const GeneratedVideoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GeneratedVideoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GeneratedVideoScalarWhereWithAggregatesInputSchema),z.lazy(() => GeneratedVideoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GeneratedVideoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GeneratedVideoScalarWhereWithAggregatesInputSchema),z.lazy(() => GeneratedVideoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  thumbnail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  algorithm: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelCreateNestedManyWithoutCreatedByInputSchema).optional(),
  medis: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChannelCreateInputSchema: z.ZodType<Prisma.ChannelCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  youtubeId: z.string(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutChannelsInputSchema),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const ChannelUncheckedCreateInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  youtubeId: z.string(),
  createdById: z.string(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const ChannelUpdateInputSchema: z.ZodType<Prisma.ChannelUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutChannelsNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const ChannelUncheckedUpdateInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const ChannelCreateManyInputSchema: z.ZodType<Prisma.ChannelCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  youtubeId: z.string(),
  createdById: z.string()
}).strict();

export const ChannelUpdateManyMutationInputSchema: z.ZodType<Prisma.ChannelUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChannelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaCreateInputSchema: z.ZodType<Prisma.MediaCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMedisInputSchema),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutMediaInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export const MediaUncheckedCreateInputSchema: z.ZodType<Prisma.MediaUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutMediaInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export const MediaUpdateInputSchema: z.ZodType<Prisma.MediaUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMedisNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutMediaNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutMediaNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaCreateManyInputSchema: z.ZodType<Prisma.MediaCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const MediaUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  media: z.lazy(() => MediaCreateNestedManyWithoutTagsInputSchema).optional(),
  parentTag: z.lazy(() => TagCreateNestedOneWithoutChildTagsInputSchema).optional(),
  childTags: z.lazy(() => TagCreateNestedManyWithoutParentTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  parentTagId: z.string().optional().nullable(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutTagsInputSchema).optional(),
  childTags: z.lazy(() => TagUncheckedCreateNestedManyWithoutParentTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutTagsNestedInputSchema).optional(),
  parentTag: z.lazy(() => TagUpdateOneWithoutChildTagsNestedInputSchema).optional(),
  childTags: z.lazy(() => TagUpdateManyWithoutParentTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentTagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutTagsNestedInputSchema).optional(),
  childTags: z.lazy(() => TagUncheckedUpdateManyWithoutParentTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  parentTagId: z.string().optional().nullable()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentTagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GeneratedVideoCreateInputSchema: z.ZodType<Prisma.GeneratedVideoCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGeneratedVideosInputSchema),
  channel: z.lazy(() => ChannelCreateNestedOneWithoutGeneratedVideosInputSchema),
  media: z.lazy(() => MediaCreateNestedManyWithoutGeneratedVideosInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedCreateInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  channelId: z.string(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutGeneratedVideosInputSchema).optional()
}).strict();

export const GeneratedVideoUpdateInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGeneratedVideosNestedInputSchema).optional(),
  channel: z.lazy(() => ChannelUpdateOneRequiredWithoutGeneratedVideosNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutGeneratedVideosNestedInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedUpdateInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutGeneratedVideosNestedInputSchema).optional()
}).strict();

export const GeneratedVideoCreateManyInputSchema: z.ZodType<Prisma.GeneratedVideoCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  channelId: z.string()
}).strict();

export const GeneratedVideoUpdateManyMutationInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GeneratedVideoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const ChannelListRelationFilterSchema: z.ZodType<Prisma.ChannelListRelationFilter> = z.object({
  every: z.lazy(() => ChannelWhereInputSchema).optional(),
  some: z.lazy(() => ChannelWhereInputSchema).optional(),
  none: z.lazy(() => ChannelWhereInputSchema).optional()
}).strict();

export const MediaListRelationFilterSchema: z.ZodType<Prisma.MediaListRelationFilter> = z.object({
  every: z.lazy(() => MediaWhereInputSchema).optional(),
  some: z.lazy(() => MediaWhereInputSchema).optional(),
  none: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export const GeneratedVideoListRelationFilterSchema: z.ZodType<Prisma.GeneratedVideoListRelationFilter> = z.object({
  every: z.lazy(() => GeneratedVideoWhereInputSchema).optional(),
  some: z.lazy(() => GeneratedVideoWhereInputSchema).optional(),
  none: z.lazy(() => GeneratedVideoWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChannelOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MediaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GeneratedVideoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GeneratedVideoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  youtubeId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  youtubeId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChannelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  youtubeId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMediaTypeFilterSchema: z.ZodType<Prisma.EnumMediaTypeFilter> = z.object({
  equals: z.lazy(() => MediaTypeSchema).optional(),
  in: z.lazy(() => MediaTypeSchema).array().optional(),
  notIn: z.lazy(() => MediaTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => NestedEnumMediaTypeFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const TagListRelationFilterSchema: z.ZodType<Prisma.TagListRelationFilter> = z.object({
  every: z.lazy(() => TagWhereInputSchema).optional(),
  some: z.lazy(() => TagWhereInputSchema).optional(),
  none: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaCountOrderByAggregateInputSchema: z.ZodType<Prisma.MediaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  audio_stream: z.lazy(() => SortOrderSchema).optional(),
  video_stream: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  video_codec: z.lazy(() => SortOrderSchema).optional(),
  audio_codec: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MediaAvgOrderByAggregateInput> = z.object({
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  audio_stream: z.lazy(() => SortOrderSchema).optional(),
  video_stream: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaMinOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  audio_stream: z.lazy(() => SortOrderSchema).optional(),
  video_stream: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaSumOrderByAggregateInputSchema: z.ZodType<Prisma.MediaSumOrderByAggregateInput> = z.object({
  width: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMediaTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMediaTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MediaTypeSchema).optional(),
  in: z.lazy(() => MediaTypeSchema).array().optional(),
  notIn: z.lazy(() => MediaTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => NestedEnumMediaTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMediaTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMediaTypeFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const TagNullableRelationFilterSchema: z.ZodType<Prisma.TagNullableRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TagWhereInputSchema).optional().nullable()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  parentTagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  parentTagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  parentTagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChannelRelationFilterSchema: z.ZodType<Prisma.ChannelRelationFilter> = z.object({
  is: z.lazy(() => ChannelWhereInputSchema).optional(),
  isNot: z.lazy(() => ChannelWhereInputSchema).optional()
}).strict();

export const GeneratedVideoCountOrderByAggregateInputSchema: z.ZodType<Prisma.GeneratedVideoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  algorithm: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GeneratedVideoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GeneratedVideoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  algorithm: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GeneratedVideoMinOrderByAggregateInputSchema: z.ZodType<Prisma.GeneratedVideoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  algorithm: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChannelCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => ChannelCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelCreateWithoutCreatedByInputSchema).array(),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChannelCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => ChannelCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChannelCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MediaCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaCreateWithoutUserInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GeneratedVideoCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GeneratedVideoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChannelUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => ChannelCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelCreateWithoutCreatedByInputSchema).array(),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChannelCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => ChannelCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChannelCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MediaUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaCreateWithoutUserInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GeneratedVideoUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GeneratedVideoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChannelUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.ChannelUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChannelCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelCreateWithoutCreatedByInputSchema).array(),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChannelCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => ChannelCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChannelUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => ChannelUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChannelCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChannelUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => ChannelUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChannelUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => ChannelUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChannelScalarWhereInputSchema),z.lazy(() => ChannelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MediaUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaCreateWithoutUserInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GeneratedVideoUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GeneratedVideoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GeneratedVideoScalarWhereInputSchema),z.lazy(() => GeneratedVideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChannelUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChannelCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelCreateWithoutCreatedByInputSchema).array(),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChannelCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => ChannelCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChannelUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => ChannelUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChannelCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChannelWhereUniqueInputSchema),z.lazy(() => ChannelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChannelUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => ChannelUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChannelUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => ChannelUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChannelScalarWhereInputSchema),z.lazy(() => ChannelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaCreateWithoutUserInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GeneratedVideoUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GeneratedVideoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GeneratedVideoScalarWhereInputSchema),z.lazy(() => GeneratedVideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutChannelsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChannelsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChannelsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChannelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChannelsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const GeneratedVideoCreateNestedManyWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoCreateNestedManyWithoutChannelInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutChannelInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GeneratedVideoCreateManyChannelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GeneratedVideoUncheckedCreateNestedManyWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedCreateNestedManyWithoutChannelInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutChannelInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GeneratedVideoCreateManyChannelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutChannelsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutChannelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChannelsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChannelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChannelsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChannelsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutChannelsInputSchema),z.lazy(() => UserUpdateWithoutChannelsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChannelsInputSchema) ]).optional(),
}).strict();

export const GeneratedVideoUpdateManyWithoutChannelNestedInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateManyWithoutChannelNestedInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutChannelInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GeneratedVideoCreateManyChannelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutChannelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GeneratedVideoScalarWhereInputSchema),z.lazy(() => GeneratedVideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GeneratedVideoUncheckedUpdateManyWithoutChannelNestedInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateManyWithoutChannelNestedInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutChannelInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GeneratedVideoCreateManyChannelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutChannelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GeneratedVideoScalarWhereInputSchema),z.lazy(() => GeneratedVideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutMedisInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMedisInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMedisInputSchema),z.lazy(() => UserUncheckedCreateWithoutMedisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMedisInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const GeneratedVideoCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutMediaInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutMediaInputSchema),z.lazy(() => TagCreateWithoutMediaInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutMediaInputSchema),z.lazy(() => TagCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GeneratedVideoUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutMediaInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutMediaInputSchema),z.lazy(() => TagCreateWithoutMediaInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutMediaInputSchema),z.lazy(() => TagCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumMediaTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMediaTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MediaTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutMedisNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMedisNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMedisInputSchema),z.lazy(() => UserUncheckedCreateWithoutMedisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMedisInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMedisInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMedisInputSchema),z.lazy(() => UserUpdateWithoutMedisInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMedisInputSchema) ]).optional(),
}).strict();

export const GeneratedVideoUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutMediaInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GeneratedVideoScalarWhereInputSchema),z.lazy(() => GeneratedVideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutMediaInputSchema),z.lazy(() => TagCreateWithoutMediaInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutMediaInputSchema),z.lazy(() => TagCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GeneratedVideoUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema).array(),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GeneratedVideoCreateOrConnectWithoutMediaInputSchema),z.lazy(() => GeneratedVideoCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GeneratedVideoWhereUniqueInputSchema),z.lazy(() => GeneratedVideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GeneratedVideoScalarWhereInputSchema),z.lazy(() => GeneratedVideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutMediaInputSchema),z.lazy(() => TagCreateWithoutMediaInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutMediaInputSchema),z.lazy(() => TagCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.MediaCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutTagsInputSchema),z.lazy(() => MediaCreateWithoutTagsInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutTagsInputSchema),z.lazy(() => MediaCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedOneWithoutChildTagsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutChildTagsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutChildTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutChildTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutChildTagsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const TagCreateNestedManyWithoutParentTagInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutParentTagInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutParentTagInputSchema),z.lazy(() => TagCreateWithoutParentTagInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutParentTagInputSchema),z.lazy(() => TagCreateOrConnectWithoutParentTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyParentTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.MediaUncheckedCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutTagsInputSchema),z.lazy(() => MediaCreateWithoutTagsInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutTagsInputSchema),z.lazy(() => MediaCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedCreateNestedManyWithoutParentTagInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutParentTagInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutParentTagInputSchema),z.lazy(() => TagCreateWithoutParentTagInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutParentTagInputSchema),z.lazy(() => TagCreateOrConnectWithoutParentTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyParentTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.MediaUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutTagsInputSchema),z.lazy(() => MediaCreateWithoutTagsInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutTagsInputSchema),z.lazy(() => MediaCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUpdateOneWithoutChildTagsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneWithoutChildTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutChildTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutChildTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutChildTagsInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutChildTagsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TagWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TagWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutChildTagsInputSchema),z.lazy(() => TagUpdateWithoutChildTagsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutChildTagsInputSchema) ]).optional(),
}).strict();

export const TagUpdateManyWithoutParentTagNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutParentTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutParentTagInputSchema),z.lazy(() => TagCreateWithoutParentTagInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutParentTagInputSchema),z.lazy(() => TagCreateOrConnectWithoutParentTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutParentTagInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutParentTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyParentTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutParentTagInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutParentTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutParentTagInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutParentTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutTagsInputSchema),z.lazy(() => MediaCreateWithoutTagsInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutTagsInputSchema),z.lazy(() => MediaCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutParentTagNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutParentTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutParentTagInputSchema),z.lazy(() => TagCreateWithoutParentTagInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutParentTagInputSchema),z.lazy(() => TagCreateOrConnectWithoutParentTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutParentTagInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutParentTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyParentTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutParentTagInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutParentTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutParentTagInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutParentTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGeneratedVideosInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGeneratedVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutGeneratedVideosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeneratedVideosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ChannelCreateNestedOneWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.ChannelCreateNestedOneWithoutGeneratedVideosInput> = z.object({
  create: z.union([ z.lazy(() => ChannelCreateWithoutGeneratedVideosInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutGeneratedVideosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChannelCreateOrConnectWithoutGeneratedVideosInputSchema).optional(),
  connect: z.lazy(() => ChannelWhereUniqueInputSchema).optional()
}).strict();

export const MediaCreateNestedManyWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaCreateNestedManyWithoutGeneratedVideosInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutGeneratedVideosInputSchema),z.lazy(() => MediaCreateOrConnectWithoutGeneratedVideosInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedCreateNestedManyWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaUncheckedCreateNestedManyWithoutGeneratedVideosInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutGeneratedVideosInputSchema),z.lazy(() => MediaCreateOrConnectWithoutGeneratedVideosInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutGeneratedVideosNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutGeneratedVideosNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGeneratedVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutGeneratedVideosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeneratedVideosInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGeneratedVideosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutGeneratedVideosInputSchema),z.lazy(() => UserUpdateWithoutGeneratedVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGeneratedVideosInputSchema) ]).optional(),
}).strict();

export const ChannelUpdateOneRequiredWithoutGeneratedVideosNestedInputSchema: z.ZodType<Prisma.ChannelUpdateOneRequiredWithoutGeneratedVideosNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChannelCreateWithoutGeneratedVideosInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutGeneratedVideosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChannelCreateOrConnectWithoutGeneratedVideosInputSchema).optional(),
  upsert: z.lazy(() => ChannelUpsertWithoutGeneratedVideosInputSchema).optional(),
  connect: z.lazy(() => ChannelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ChannelUpdateToOneWithWhereWithoutGeneratedVideosInputSchema),z.lazy(() => ChannelUpdateWithoutGeneratedVideosInputSchema),z.lazy(() => ChannelUncheckedUpdateWithoutGeneratedVideosInputSchema) ]).optional(),
}).strict();

export const MediaUpdateManyWithoutGeneratedVideosNestedInputSchema: z.ZodType<Prisma.MediaUpdateManyWithoutGeneratedVideosNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutGeneratedVideosInputSchema),z.lazy(() => MediaCreateOrConnectWithoutGeneratedVideosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutGeneratedVideosInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutGeneratedVideosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutGeneratedVideosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedUpdateManyWithoutGeneratedVideosNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutGeneratedVideosNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutGeneratedVideosInputSchema),z.lazy(() => MediaCreateOrConnectWithoutGeneratedVideosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutGeneratedVideosInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutGeneratedVideosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutGeneratedVideosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumMediaTypeFilterSchema: z.ZodType<Prisma.NestedEnumMediaTypeFilter> = z.object({
  equals: z.lazy(() => MediaTypeSchema).optional(),
  in: z.lazy(() => MediaTypeSchema).array().optional(),
  notIn: z.lazy(() => MediaTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => NestedEnumMediaTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumMediaTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMediaTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MediaTypeSchema).optional(),
  in: z.lazy(() => MediaTypeSchema).array().optional(),
  notIn: z.lazy(() => MediaTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => NestedEnumMediaTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMediaTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMediaTypeFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelCreateNestedManyWithoutCreatedByInputSchema).optional(),
  medis: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelCreateNestedManyWithoutCreatedByInputSchema).optional(),
  medis: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChannelCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  youtubeId: z.string(),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const ChannelUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  youtubeId: z.string(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const ChannelCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => ChannelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChannelCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const ChannelCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.ChannelCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChannelCreateManyCreatedByInputSchema),z.lazy(() => ChannelCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MediaCreateWithoutUserInputSchema: z.ZodType<Prisma.MediaCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutMediaInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export const MediaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutMediaInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export const MediaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MediaCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MediaCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MediaCreateManyUserInputSchema),z.lazy(() => MediaCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GeneratedVideoCreateWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  channel: z.lazy(() => ChannelCreateNestedOneWithoutGeneratedVideosInputSchema),
  media: z.lazy(() => MediaCreateNestedManyWithoutGeneratedVideosInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  channelId: z.string(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutGeneratedVideosInputSchema).optional()
}).strict();

export const GeneratedVideoCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const GeneratedVideoCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.GeneratedVideoCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GeneratedVideoCreateManyUserInputSchema),z.lazy(() => GeneratedVideoCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChannelUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => ChannelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChannelUpdateWithoutCreatedByInputSchema),z.lazy(() => ChannelUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => ChannelCreateWithoutCreatedByInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const ChannelUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => ChannelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChannelUpdateWithoutCreatedByInputSchema),z.lazy(() => ChannelUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const ChannelUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => ChannelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChannelUpdateManyMutationInputSchema),z.lazy(() => ChannelUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const ChannelScalarWhereInputSchema: z.ZodType<Prisma.ChannelScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChannelScalarWhereInputSchema),z.lazy(() => ChannelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChannelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChannelScalarWhereInputSchema),z.lazy(() => ChannelScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  youtubeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const MediaUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MediaUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MediaUpdateWithoutUserInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MediaUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MediaUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateWithoutUserInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const MediaUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MediaUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MediaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateManyMutationInputSchema),z.lazy(() => MediaUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const MediaScalarWhereInputSchema: z.ZodType<Prisma.MediaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumMediaTypeFilterSchema),z.lazy(() => MediaTypeSchema) ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  width: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  height: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  audio_stream: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video_stream: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  video_codec: z.lazy(() => JsonNullableFilterSchema).optional(),
  audio_codec: z.lazy(() => JsonNullableFilterSchema).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const GeneratedVideoUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithoutUserInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutUserInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const GeneratedVideoUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GeneratedVideoUpdateWithoutUserInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const GeneratedVideoUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => GeneratedVideoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GeneratedVideoUpdateManyMutationInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const GeneratedVideoScalarWhereInputSchema: z.ZodType<Prisma.GeneratedVideoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GeneratedVideoScalarWhereInputSchema),z.lazy(() => GeneratedVideoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GeneratedVideoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GeneratedVideoScalarWhereInputSchema),z.lazy(() => GeneratedVideoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  algorithm: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutChannelsInputSchema: z.ZodType<Prisma.UserCreateWithoutChannelsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  medis: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutChannelsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutChannelsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutChannelsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChannelsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutChannelsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChannelsInputSchema) ]),
}).strict();

export const GeneratedVideoCreateWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoCreateWithoutChannelInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGeneratedVideosInputSchema),
  media: z.lazy(() => MediaCreateNestedManyWithoutGeneratedVideosInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedCreateWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedCreateWithoutChannelInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutGeneratedVideosInputSchema).optional()
}).strict();

export const GeneratedVideoCreateOrConnectWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoCreateOrConnectWithoutChannelInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema) ]),
}).strict();

export const GeneratedVideoCreateManyChannelInputEnvelopeSchema: z.ZodType<Prisma.GeneratedVideoCreateManyChannelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GeneratedVideoCreateManyChannelInputSchema),z.lazy(() => GeneratedVideoCreateManyChannelInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutChannelsInputSchema: z.ZodType<Prisma.UserUpsertWithoutChannelsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutChannelsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChannelsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutChannelsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChannelsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutChannelsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutChannelsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutChannelsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChannelsInputSchema) ]),
}).strict();

export const UserUpdateWithoutChannelsInputSchema: z.ZodType<Prisma.UserUpdateWithoutChannelsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutChannelsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutChannelsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const GeneratedVideoUpsertWithWhereUniqueWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoUpsertWithWhereUniqueWithoutChannelInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateWithoutChannelInputSchema) ]),
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutChannelInputSchema) ]),
}).strict();

export const GeneratedVideoUpdateWithWhereUniqueWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateWithWhereUniqueWithoutChannelInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GeneratedVideoUpdateWithoutChannelInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateWithoutChannelInputSchema) ]),
}).strict();

export const GeneratedVideoUpdateManyWithWhereWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateManyWithWhereWithoutChannelInput> = z.object({
  where: z.lazy(() => GeneratedVideoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GeneratedVideoUpdateManyMutationInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutChannelInputSchema) ]),
}).strict();

export const UserCreateWithoutMedisInputSchema: z.ZodType<Prisma.UserCreateWithoutMedisInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelCreateNestedManyWithoutCreatedByInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMedisInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMedisInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMedisInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMedisInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMedisInputSchema),z.lazy(() => UserUncheckedCreateWithoutMedisInputSchema) ]),
}).strict();

export const GeneratedVideoCreateWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoCreateWithoutMediaInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGeneratedVideosInputSchema),
  channel: z.lazy(() => ChannelCreateNestedOneWithoutGeneratedVideosInputSchema)
}).strict();

export const GeneratedVideoUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedCreateWithoutMediaInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  channelId: z.string()
}).strict();

export const GeneratedVideoCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export const TagCreateWithoutMediaInputSchema: z.ZodType<Prisma.TagCreateWithoutMediaInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  parentTag: z.lazy(() => TagCreateNestedOneWithoutChildTagsInputSchema).optional(),
  childTags: z.lazy(() => TagCreateNestedManyWithoutParentTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutMediaInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  parentTagId: z.string().optional().nullable(),
  childTags: z.lazy(() => TagUncheckedCreateNestedManyWithoutParentTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutMediaInputSchema),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export const UserUpsertWithoutMedisInputSchema: z.ZodType<Prisma.UserUpsertWithoutMedisInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMedisInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMedisInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMedisInputSchema),z.lazy(() => UserUncheckedCreateWithoutMedisInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMedisInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMedisInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMedisInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMedisInputSchema) ]),
}).strict();

export const UserUpdateWithoutMedisInputSchema: z.ZodType<Prisma.UserUpdateWithoutMedisInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMedisInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMedisInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const GeneratedVideoUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoUpsertWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GeneratedVideoUpdateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => GeneratedVideoCreateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export const GeneratedVideoUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => GeneratedVideoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GeneratedVideoUpdateWithoutMediaInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export const GeneratedVideoUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateManyWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => GeneratedVideoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GeneratedVideoUpdateManyMutationInputSchema),z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutMediaInputSchema) ]),
}).strict();

export const TagUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutMediaInputSchema),z.lazy(() => TagUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutMediaInputSchema),z.lazy(() => TagUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export const TagUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutMediaInputSchema),z.lazy(() => TagUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export const TagUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema),z.lazy(() => TagUncheckedUpdateManyWithoutMediaInputSchema) ]),
}).strict();

export const TagScalarWhereInputSchema: z.ZodType<Prisma.TagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parentTagId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MediaCreateWithoutTagsInputSchema: z.ZodType<Prisma.MediaCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMedisInputSchema),
  generatedVideos: z.lazy(() => GeneratedVideoCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export const MediaUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export const MediaCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutTagsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagCreateWithoutChildTagsInputSchema: z.ZodType<Prisma.TagCreateWithoutChildTagsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  media: z.lazy(() => MediaCreateNestedManyWithoutTagsInputSchema).optional(),
  parentTag: z.lazy(() => TagCreateNestedOneWithoutChildTagsInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutChildTagsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutChildTagsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  parentTagId: z.string().optional().nullable(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutChildTagsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutChildTagsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutChildTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutChildTagsInputSchema) ]),
}).strict();

export const TagCreateWithoutParentTagInputSchema: z.ZodType<Prisma.TagCreateWithoutParentTagInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  media: z.lazy(() => MediaCreateNestedManyWithoutTagsInputSchema).optional(),
  childTags: z.lazy(() => TagCreateNestedManyWithoutParentTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutParentTagInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutParentTagInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutTagsInputSchema).optional(),
  childTags: z.lazy(() => TagUncheckedCreateNestedManyWithoutParentTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutParentTagInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutParentTagInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutParentTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema) ]),
}).strict();

export const TagCreateManyParentTagInputEnvelopeSchema: z.ZodType<Prisma.TagCreateManyParentTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TagCreateManyParentTagInputSchema),z.lazy(() => TagCreateManyParentTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MediaUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.MediaUpsertWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MediaUpdateWithoutTagsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutTagsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const MediaUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.MediaUpdateWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateWithoutTagsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const MediaUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.MediaUpdateManyWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => MediaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateManyMutationInputSchema),z.lazy(() => MediaUncheckedUpdateManyWithoutTagsInputSchema) ]),
}).strict();

export const TagUpsertWithoutChildTagsInputSchema: z.ZodType<Prisma.TagUpsertWithoutChildTagsInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutChildTagsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutChildTagsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutChildTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutChildTagsInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutChildTagsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutChildTagsInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutChildTagsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutChildTagsInputSchema) ]),
}).strict();

export const TagUpdateWithoutChildTagsInputSchema: z.ZodType<Prisma.TagUpdateWithoutChildTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutTagsNestedInputSchema).optional(),
  parentTag: z.lazy(() => TagUpdateOneWithoutChildTagsNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutChildTagsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutChildTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentTagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const TagUpsertWithWhereUniqueWithoutParentTagInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutParentTagInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutParentTagInputSchema),z.lazy(() => TagUncheckedUpdateWithoutParentTagInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutParentTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutParentTagInputSchema) ]),
}).strict();

export const TagUpdateWithWhereUniqueWithoutParentTagInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutParentTagInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutParentTagInputSchema),z.lazy(() => TagUncheckedUpdateWithoutParentTagInputSchema) ]),
}).strict();

export const TagUpdateManyWithWhereWithoutParentTagInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutParentTagInput> = z.object({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema),z.lazy(() => TagUncheckedUpdateManyWithoutParentTagInputSchema) ]),
}).strict();

export const UserCreateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.UserCreateWithoutGeneratedVideosInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelCreateNestedManyWithoutCreatedByInputSchema).optional(),
  medis: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutGeneratedVideosInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGeneratedVideosInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutGeneratedVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutGeneratedVideosInputSchema) ]),
}).strict();

export const ChannelCreateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.ChannelCreateWithoutGeneratedVideosInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  youtubeId: z.string(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutChannelsInputSchema)
}).strict();

export const ChannelUncheckedCreateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.ChannelUncheckedCreateWithoutGeneratedVideosInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  youtubeId: z.string(),
  createdById: z.string()
}).strict();

export const ChannelCreateOrConnectWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.ChannelCreateOrConnectWithoutGeneratedVideosInput> = z.object({
  where: z.lazy(() => ChannelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChannelCreateWithoutGeneratedVideosInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutGeneratedVideosInputSchema) ]),
}).strict();

export const MediaCreateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaCreateWithoutGeneratedVideosInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMedisInputSchema),
  tags: z.lazy(() => TagCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export const MediaUncheckedCreateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutGeneratedVideosInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutMediaInputSchema).optional()
}).strict();

export const MediaCreateOrConnectWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutGeneratedVideosInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema) ]),
}).strict();

export const UserUpsertWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.UserUpsertWithoutGeneratedVideosInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutGeneratedVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGeneratedVideosInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutGeneratedVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutGeneratedVideosInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeneratedVideosInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutGeneratedVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGeneratedVideosInputSchema) ]),
}).strict();

export const UserUpdateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.UserUpdateWithoutGeneratedVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutGeneratedVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  channels: z.lazy(() => ChannelUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  medis: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ChannelUpsertWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.ChannelUpsertWithoutGeneratedVideosInput> = z.object({
  update: z.union([ z.lazy(() => ChannelUpdateWithoutGeneratedVideosInputSchema),z.lazy(() => ChannelUncheckedUpdateWithoutGeneratedVideosInputSchema) ]),
  create: z.union([ z.lazy(() => ChannelCreateWithoutGeneratedVideosInputSchema),z.lazy(() => ChannelUncheckedCreateWithoutGeneratedVideosInputSchema) ]),
  where: z.lazy(() => ChannelWhereInputSchema).optional()
}).strict();

export const ChannelUpdateToOneWithWhereWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.ChannelUpdateToOneWithWhereWithoutGeneratedVideosInput> = z.object({
  where: z.lazy(() => ChannelWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ChannelUpdateWithoutGeneratedVideosInputSchema),z.lazy(() => ChannelUncheckedUpdateWithoutGeneratedVideosInputSchema) ]),
}).strict();

export const ChannelUpdateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.ChannelUpdateWithoutGeneratedVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutChannelsNestedInputSchema).optional()
}).strict();

export const ChannelUncheckedUpdateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateWithoutGeneratedVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaUpsertWithWhereUniqueWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaUpsertWithWhereUniqueWithoutGeneratedVideosInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MediaUpdateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutGeneratedVideosInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUncheckedCreateWithoutGeneratedVideosInputSchema) ]),
}).strict();

export const MediaUpdateWithWhereUniqueWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaUpdateWithWhereUniqueWithoutGeneratedVideosInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateWithoutGeneratedVideosInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutGeneratedVideosInputSchema) ]),
}).strict();

export const MediaUpdateManyWithWhereWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaUpdateManyWithWhereWithoutGeneratedVideosInput> = z.object({
  where: z.lazy(() => MediaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateManyMutationInputSchema),z.lazy(() => MediaUncheckedUpdateManyWithoutGeneratedVideosInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const ChannelCreateManyCreatedByInputSchema: z.ZodType<Prisma.ChannelCreateManyCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  youtubeId: z.string()
}).strict();

export const MediaCreateManyUserInputSchema: z.ZodType<Prisma.MediaCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => MediaTypeSchema),
  url: z.string().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  audio_stream: z.string().optional().nullable(),
  video_stream: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GeneratedVideoCreateManyUserInputSchema: z.ZodType<Prisma.GeneratedVideoCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  channelId: z.string()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChannelUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const ChannelUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const ChannelUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ChannelUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  youtubeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaUpdateWithoutUserInputSchema: z.ZodType<Prisma.MediaUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutMediaNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutMediaNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GeneratedVideoUpdateWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  channel: z.lazy(() => ChannelUpdateOneRequiredWithoutGeneratedVideosNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutGeneratedVideosNestedInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutGeneratedVideosNestedInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GeneratedVideoCreateManyChannelInputSchema: z.ZodType<Prisma.GeneratedVideoCreateManyChannelInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  url: z.string(),
  algorithm: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const GeneratedVideoUpdateWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateWithoutChannelInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGeneratedVideosNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutGeneratedVideosNestedInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedUpdateWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateWithoutChannelInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutGeneratedVideosNestedInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedUpdateManyWithoutChannelInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateManyWithoutChannelInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GeneratedVideoUpdateWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoUpdateWithoutMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGeneratedVideosNestedInputSchema).optional(),
  channel: z.lazy(() => ChannelUpdateOneRequiredWithoutGeneratedVideosNestedInputSchema).optional()
}).strict();

export const GeneratedVideoUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateWithoutMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GeneratedVideoUncheckedUpdateManyWithoutMediaInputSchema: z.ZodType<Prisma.GeneratedVideoUncheckedUpdateManyWithoutMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  algorithm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUpdateWithoutMediaInputSchema: z.ZodType<Prisma.TagUpdateWithoutMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentTag: z.lazy(() => TagUpdateOneWithoutChildTagsNestedInputSchema).optional(),
  childTags: z.lazy(() => TagUpdateManyWithoutParentTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentTagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  childTags: z.lazy(() => TagUncheckedUpdateManyWithoutParentTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateManyWithoutMediaInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentTagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagCreateManyParentTagInputSchema: z.ZodType<Prisma.TagCreateManyParentTagInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const MediaUpdateWithoutTagsInputSchema: z.ZodType<Prisma.MediaUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMedisNestedInputSchema).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  generatedVideos: z.lazy(() => GeneratedVideoUncheckedUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUpdateWithoutParentTagInputSchema: z.ZodType<Prisma.TagUpdateWithoutParentTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutTagsNestedInputSchema).optional(),
  childTags: z.lazy(() => TagUpdateManyWithoutParentTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutParentTagInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutParentTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutTagsNestedInputSchema).optional(),
  childTags: z.lazy(() => TagUncheckedUpdateManyWithoutParentTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateManyWithoutParentTagInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutParentTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaUpdateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaUpdateWithoutGeneratedVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMedisNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutGeneratedVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateManyWithoutGeneratedVideosInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutGeneratedVideosInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MediaTypeSchema),z.lazy(() => EnumMediaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  width: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  height: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_stream: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  audio_codec: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const ChannelFindFirstArgsSchema: z.ZodType<Prisma.ChannelFindFirstArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithRelationInputSchema.array(),ChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: ChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChannelScalarFieldEnumSchema,ChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChannelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChannelFindFirstOrThrowArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithRelationInputSchema.array(),ChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: ChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChannelScalarFieldEnumSchema,ChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChannelFindManyArgsSchema: z.ZodType<Prisma.ChannelFindManyArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithRelationInputSchema.array(),ChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: ChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChannelScalarFieldEnumSchema,ChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChannelAggregateArgsSchema: z.ZodType<Prisma.ChannelAggregateArgs> = z.object({
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithRelationInputSchema.array(),ChannelOrderByWithRelationInputSchema ]).optional(),
  cursor: ChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChannelGroupByArgsSchema: z.ZodType<Prisma.ChannelGroupByArgs> = z.object({
  where: ChannelWhereInputSchema.optional(),
  orderBy: z.union([ ChannelOrderByWithAggregationInputSchema.array(),ChannelOrderByWithAggregationInputSchema ]).optional(),
  by: ChannelScalarFieldEnumSchema.array(),
  having: ChannelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChannelFindUniqueArgsSchema: z.ZodType<Prisma.ChannelFindUniqueArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereUniqueInputSchema,
}).strict() ;

export const ChannelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChannelFindUniqueOrThrowArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereUniqueInputSchema,
}).strict() ;

export const MediaFindFirstArgsSchema: z.ZodType<Prisma.MediaFindFirstArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MediaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MediaFindFirstOrThrowArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MediaFindManyArgsSchema: z.ZodType<Prisma.MediaFindManyArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MediaAggregateArgsSchema: z.ZodType<Prisma.MediaAggregateArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MediaGroupByArgsSchema: z.ZodType<Prisma.MediaGroupByArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithAggregationInputSchema.array(),MediaOrderByWithAggregationInputSchema ]).optional(),
  by: MediaScalarFieldEnumSchema.array(),
  having: MediaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MediaFindUniqueArgsSchema: z.ZodType<Prisma.MediaFindUniqueArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export const MediaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MediaFindUniqueOrThrowArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const GeneratedVideoFindFirstArgsSchema: z.ZodType<Prisma.GeneratedVideoFindFirstArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  where: GeneratedVideoWhereInputSchema.optional(),
  orderBy: z.union([ GeneratedVideoOrderByWithRelationInputSchema.array(),GeneratedVideoOrderByWithRelationInputSchema ]).optional(),
  cursor: GeneratedVideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GeneratedVideoScalarFieldEnumSchema,GeneratedVideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GeneratedVideoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GeneratedVideoFindFirstOrThrowArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  where: GeneratedVideoWhereInputSchema.optional(),
  orderBy: z.union([ GeneratedVideoOrderByWithRelationInputSchema.array(),GeneratedVideoOrderByWithRelationInputSchema ]).optional(),
  cursor: GeneratedVideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GeneratedVideoScalarFieldEnumSchema,GeneratedVideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GeneratedVideoFindManyArgsSchema: z.ZodType<Prisma.GeneratedVideoFindManyArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  where: GeneratedVideoWhereInputSchema.optional(),
  orderBy: z.union([ GeneratedVideoOrderByWithRelationInputSchema.array(),GeneratedVideoOrderByWithRelationInputSchema ]).optional(),
  cursor: GeneratedVideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GeneratedVideoScalarFieldEnumSchema,GeneratedVideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GeneratedVideoAggregateArgsSchema: z.ZodType<Prisma.GeneratedVideoAggregateArgs> = z.object({
  where: GeneratedVideoWhereInputSchema.optional(),
  orderBy: z.union([ GeneratedVideoOrderByWithRelationInputSchema.array(),GeneratedVideoOrderByWithRelationInputSchema ]).optional(),
  cursor: GeneratedVideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GeneratedVideoGroupByArgsSchema: z.ZodType<Prisma.GeneratedVideoGroupByArgs> = z.object({
  where: GeneratedVideoWhereInputSchema.optional(),
  orderBy: z.union([ GeneratedVideoOrderByWithAggregationInputSchema.array(),GeneratedVideoOrderByWithAggregationInputSchema ]).optional(),
  by: GeneratedVideoScalarFieldEnumSchema.array(),
  having: GeneratedVideoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GeneratedVideoFindUniqueArgsSchema: z.ZodType<Prisma.GeneratedVideoFindUniqueArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  where: GeneratedVideoWhereUniqueInputSchema,
}).strict() ;

export const GeneratedVideoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GeneratedVideoFindUniqueOrThrowArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  where: GeneratedVideoWhereUniqueInputSchema,
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const ChannelCreateArgsSchema: z.ZodType<Prisma.ChannelCreateArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  data: z.union([ ChannelCreateInputSchema,ChannelUncheckedCreateInputSchema ]),
}).strict() ;

export const ChannelUpsertArgsSchema: z.ZodType<Prisma.ChannelUpsertArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereUniqueInputSchema,
  create: z.union([ ChannelCreateInputSchema,ChannelUncheckedCreateInputSchema ]),
  update: z.union([ ChannelUpdateInputSchema,ChannelUncheckedUpdateInputSchema ]),
}).strict() ;

export const ChannelCreateManyArgsSchema: z.ZodType<Prisma.ChannelCreateManyArgs> = z.object({
  data: z.union([ ChannelCreateManyInputSchema,ChannelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChannelDeleteArgsSchema: z.ZodType<Prisma.ChannelDeleteArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  where: ChannelWhereUniqueInputSchema,
}).strict() ;

export const ChannelUpdateArgsSchema: z.ZodType<Prisma.ChannelUpdateArgs> = z.object({
  select: ChannelSelectSchema.optional(),
  include: ChannelIncludeSchema.optional(),
  data: z.union([ ChannelUpdateInputSchema,ChannelUncheckedUpdateInputSchema ]),
  where: ChannelWhereUniqueInputSchema,
}).strict() ;

export const ChannelUpdateManyArgsSchema: z.ZodType<Prisma.ChannelUpdateManyArgs> = z.object({
  data: z.union([ ChannelUpdateManyMutationInputSchema,ChannelUncheckedUpdateManyInputSchema ]),
  where: ChannelWhereInputSchema.optional(),
}).strict() ;

export const ChannelDeleteManyArgsSchema: z.ZodType<Prisma.ChannelDeleteManyArgs> = z.object({
  where: ChannelWhereInputSchema.optional(),
}).strict() ;

export const MediaCreateArgsSchema: z.ZodType<Prisma.MediaCreateArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  data: z.union([ MediaCreateInputSchema,MediaUncheckedCreateInputSchema ]),
}).strict() ;

export const MediaUpsertArgsSchema: z.ZodType<Prisma.MediaUpsertArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
  create: z.union([ MediaCreateInputSchema,MediaUncheckedCreateInputSchema ]),
  update: z.union([ MediaUpdateInputSchema,MediaUncheckedUpdateInputSchema ]),
}).strict() ;

export const MediaCreateManyArgsSchema: z.ZodType<Prisma.MediaCreateManyArgs> = z.object({
  data: z.union([ MediaCreateManyInputSchema,MediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MediaDeleteArgsSchema: z.ZodType<Prisma.MediaDeleteArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export const MediaUpdateArgsSchema: z.ZodType<Prisma.MediaUpdateArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  data: z.union([ MediaUpdateInputSchema,MediaUncheckedUpdateInputSchema ]),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export const MediaUpdateManyArgsSchema: z.ZodType<Prisma.MediaUpdateManyArgs> = z.object({
  data: z.union([ MediaUpdateManyMutationInputSchema,MediaUncheckedUpdateManyInputSchema ]),
  where: MediaWhereInputSchema.optional(),
}).strict() ;

export const MediaDeleteManyArgsSchema: z.ZodType<Prisma.MediaDeleteManyArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const GeneratedVideoCreateArgsSchema: z.ZodType<Prisma.GeneratedVideoCreateArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  data: z.union([ GeneratedVideoCreateInputSchema,GeneratedVideoUncheckedCreateInputSchema ]),
}).strict() ;

export const GeneratedVideoUpsertArgsSchema: z.ZodType<Prisma.GeneratedVideoUpsertArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  where: GeneratedVideoWhereUniqueInputSchema,
  create: z.union([ GeneratedVideoCreateInputSchema,GeneratedVideoUncheckedCreateInputSchema ]),
  update: z.union([ GeneratedVideoUpdateInputSchema,GeneratedVideoUncheckedUpdateInputSchema ]),
}).strict() ;

export const GeneratedVideoCreateManyArgsSchema: z.ZodType<Prisma.GeneratedVideoCreateManyArgs> = z.object({
  data: z.union([ GeneratedVideoCreateManyInputSchema,GeneratedVideoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GeneratedVideoDeleteArgsSchema: z.ZodType<Prisma.GeneratedVideoDeleteArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  where: GeneratedVideoWhereUniqueInputSchema,
}).strict() ;

export const GeneratedVideoUpdateArgsSchema: z.ZodType<Prisma.GeneratedVideoUpdateArgs> = z.object({
  select: GeneratedVideoSelectSchema.optional(),
  include: GeneratedVideoIncludeSchema.optional(),
  data: z.union([ GeneratedVideoUpdateInputSchema,GeneratedVideoUncheckedUpdateInputSchema ]),
  where: GeneratedVideoWhereUniqueInputSchema,
}).strict() ;

export const GeneratedVideoUpdateManyArgsSchema: z.ZodType<Prisma.GeneratedVideoUpdateManyArgs> = z.object({
  data: z.union([ GeneratedVideoUpdateManyMutationInputSchema,GeneratedVideoUncheckedUpdateManyInputSchema ]),
  where: GeneratedVideoWhereInputSchema.optional(),
}).strict() ;

export const GeneratedVideoDeleteManyArgsSchema: z.ZodType<Prisma.GeneratedVideoDeleteManyArgs> = z.object({
  where: GeneratedVideoWhereInputSchema.optional(),
}).strict() ;