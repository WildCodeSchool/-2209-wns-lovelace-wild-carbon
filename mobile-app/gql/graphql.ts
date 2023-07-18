/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AppUser = {
  __typename?: 'AppUser';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type Article = {
  __typename?: 'Article';
  category: Category;
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  articles: Array<Article>;
  categoryName: Scalars['String'];
  id: Scalars['ID'];
  spendings: Array<Spending>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Article;
  createSpending: Spending;
  createUser: AppUser;
  deleteArticle: Article;
  deleteSpending: Spending;
  signIn: AppUser;
  signOut: AppUser;
  updateArticle: Article;
  updateSpending: Spending;
};


export type MutationCreateArticleArgs = {
  categoryName: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateSpendingArgs = {
  categoryName: Scalars['String'];
  date: Scalars['DateTime'];
  title: Scalars['String'];
  unit: Scalars['Float'];
  weight: Scalars['Float'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSpendingArgs = {
  id: Scalars['String'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignOutArgs = {
  id: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  categoryName: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationUpdateSpendingArgs = {
  categoryName: Scalars['String'];
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  unit: Scalars['Float'];
  weight: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
  getUserById: AppUser;
  getUsers: Array<AppUser>;
  myProfile: AppUser;
  spendings: Array<Spending>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};

export type Spending = {
  __typename?: 'Spending';
  category: Category;
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  localizedDate: Scalars['String'];
  title: Scalars['String'];
  unit: Scalars['Float'];
  weight: Scalars['Float'];
};

export type CreateSpendingMutationVariables = Exact<{
  title: Scalars['String'];
  date: Scalars['DateTime'];
  unit: Scalars['Float'];
  weight: Scalars['Float'];
  categoryName: Scalars['String'];
}>;


export type CreateSpendingMutation = { __typename?: 'Mutation', createSpending: { __typename?: 'Spending', title: string, date: any, unit: number, weight: number, category: { __typename?: 'Category', categoryName: string } } };

export type Get_SpendingQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_SpendingQuery = { __typename?: 'Query', spendings: Array<{ __typename?: 'Spending', date: any, id: string, localizedDate: string, title: string, unit: number, weight: number, category: { __typename?: 'Category', categoryName: string } }> };


export const CreateSpendingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSpending"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weight"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSpending"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"unit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unit"}}},{"kind":"Argument","name":{"kind":"Name","value":"weight"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weight"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSpendingMutation, CreateSpendingMutationVariables>;
export const Get_SpendingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_SPENDING"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spendings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localizedDate"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]} as unknown as DocumentNode<Get_SpendingQuery, Get_SpendingQueryVariables>;