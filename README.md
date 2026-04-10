## Getting Started

```bash
pnpm dev
```

Open with browser: [http://localhost:3000](http://localhost:3000)

## Folder Structure

`app` - page, layout and inner components
`components` - global components
`lib` - http actions, service, utilities and hooks

When building a new Server Component/Page inside the `app` folder, I suggest you (to create if doesn't exist) `_components` folder in the nearest parent folder for reusable components

## Calling API - Logic

- **1. Server Side:**
  `Server Component` ⇌ `Server Action` ⇌ `Global Fetch`

  <br />

  All server actions should be placed in `/lib/actions/*.action.ts`

  ```typescript
  export const getSubjectTopicAction = async (
    props: Parameters<typeof getSubjectTopic>[0],
  ) => {
    try {
      // Check auth
      return handlePrivateRequest((serverProps) =>
        // Global fetch
        getSubjectTopic({ ...serverProps, ...props }),
      );
    } catch (err) {
      console.error(err);
    }
  };
  ```

- **2. Client Side:**
  `Client Component` ⇌ `Tanstack Query` ⇌ `Server Action` ⇌ `Global Fetch`

    <br />

  ```typescript
  const { mutate: createTopic, isPending } = useMutation<
    FetchResult<any>,
    Error,
    ICreateTopicBody
  >({
    mutationFn: async (body: ICreateTopicBody): Promise<any> =>
      createSubjectTopicAction({
        params: { topicContainerId: id },
        body,
      }),
  });
  ```

## Example Usages of Main Components

**Ex. 1:** In `Cabinet` layout, all the pages have nearly the same UI (Breadcrumb, Title, Filter, Extra action, Table, etc.), so I compile them all in `MainCabinetContainer`, we can see this template in the example of `CourseTasksPage`:

![Course Task Page](/public/images/docs/image-1.png)

```typescript
const CourseTasksPage = async ({ searchParams }) => {
  const params = await searchParams;
  const tasksFetch = getSubjectTasksAction({
    params: {
      ...params,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });
  const [tasks] = await Promise.all([tasksFetch]);
  const total = (tasks?.success && tasks.meta?.total) || 0;

  return (
    <MainCabinetContainer
      title="Topshiriqlar ro’yxati"
      badgeText={`Topshiriqlar soni: ${total}`}
      extra={
        <>
          <FilterButton
            types={[
              SubjectFilters.EducationYears,
              SubjectFilters.Semesters,
              SubjectFilters.Groups,
              SubjectFilters.Subjects,
            ]}
          />
          <Link
            href={`${paths.private.subjects.tasksBase}/${paths.reservedKeys.create}`}
          >
            <Button>
              <PlusSquare /> Yaratish
            </Button>
          </Link>
        </>
      }
    >
      <TasksBaseTable
        dataSource={(tasks?.success && tasks?.data) || []}
        total={(tasks?.success && tasks?.meta?.total) || 0}
      />
    </MainCabinetContainer>
  );
};
```

<hr />

**Ex. 2:** The next common layout is `SubjectActionContainer`, we can see this template in the example of `CreateTopicItemPage`:

![Create Topic Item Page](/public/images/docs/image-2.png)

```typescript
const CreateTopicItemPage = async ({ params }) => {
  const { topicContainerId } = await params;
  const trainingTypesDataFetch = getSubjectFilterByTypeAction({
    params: { filterType: SubjectFilters.TrainingTypes },
  });
  const subjectTopicFetch = getSubjectTopicWithIdAction({
    params: { topicContainerId, page: 1, per_page: 1 },
  });
  const [trainingTypesData, subjectTopic] = await Promise.all([
    trainingTypesDataFetch,
    subjectTopicFetch,
  ]);
  const trainingTypes = trainingTypesData?.success && trainingTypesData?.data;

  return (
    <SubjectActionContainer title="Mavzu yaratish">
      <EduInfoTable
        dataSource={[
          {
            subject:
              (subjectTopic?.success &&
                subjectTopic?.data?.curriculum_subject?.subject_name) ||
              "-",
          },
        ]}
        pagination={false}
      />
      <CreateTopicForm
        trainingTypes={trainingTypes || []}
        id={topicContainerId}
      />
    </SubjectActionContainer>
  );
};
```

<hr />

## Styles

- **Theme:** `/app/_styles/globals.scss` has theme configuration for light theme: `:root {}`, and dark theme `.dark {}`
