import { Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../components/Form/Input';
import { TextArea } from '../../../../components/Form/TextArea';
import { Form } from '../../../../components/Form/Form';
import type {
  DashboardChapterQuery,
  CreateChapterInputs,
} from '../../../../generated/graphql';

interface ChapterFormProps {
  loading: boolean;
  onSubmit: (data: CreateChapterInputs) => Promise<void>;
  data?: DashboardChapterQuery;
  submitText: string;
  loadingText: string;
}

type Fields = {
  key: keyof CreateChapterInputs;
  placeholder: string;
  label: string;
  required: boolean;
  type: string;
};

const fields: Fields[] = [
  {
    key: 'name',
    label: 'Chapter name',
    placeholder: 'freeCodeCamp',
    required: true,
    type: 'text',
  },
  {
    key: 'description',
    label: 'Description',
    placeholder:
      'freeCodeCamp is a nonprofit organization that helps people learn to code for free',
    required: true,
    type: 'textarea',
  },
  {
    key: 'city',
    label: 'City',
    placeholder: 'San Francisco',
    required: false,
    type: 'text',
  },
  {
    key: 'region',
    label: 'Region',
    placeholder: 'California',
    required: false,
    type: 'text',
  },
  {
    key: 'country',
    label: 'Country',
    placeholder: 'United States of America',
    required: false,
    type: 'text',
  },
  {
    key: 'category',
    label: 'Category',
    placeholder: 'Education and nonprofit work',
    required: true,
    type: 'text',
  },
  {
    key: 'image_url',
    label: 'Image Url',
    placeholder: 'https://www.freecodecamp.org',
    required: false,
    type: 'url',
  },
  {
    key: 'chat_url',
    label: 'Chat link',
    placeholder: 'https://discord.gg/KVUmVXA',
    required: false,
    type: 'url',
  },
];

const ChapterForm: React.FC<ChapterFormProps> = (props) => {
  const { loading, onSubmit, data, submitText, loadingText } = props;
  const chapter = data?.dashboardChapter;

  const defaultValues: CreateChapterInputs = {
    name: chapter?.name ?? '',
    description: chapter?.description ?? '',
    city: chapter?.city ?? '',
    region: chapter?.region ?? '',
    country: chapter?.country ?? '',
    category: chapter?.category ?? '',
    image_url: chapter?.image_url ?? '',
    chat_url: chapter?.chat_url ?? '',
  };
  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<CreateChapterInputs>({
    defaultValues,
  });

  return (
    <Form submitLabel={submitText} FormHandling={handleSubmit(onSubmit)}>
      {fields.map(({ key, label, placeholder, required, type }) =>
        type == 'textarea' ? (
          <TextArea
            key={key}
            label={label}
            placeholder={placeholder}
            {...register(key)}
            isRequired={required}
            defaultValue={defaultValues[key] ?? undefined}
            isDisabled={loading}
          />
        ) : (
          <Input
            key={key}
            label={label}
            placeholder={placeholder}
            {...register(key)}
            type={type}
            isRequired={required}
            defaultValue={defaultValues[key] ?? undefined}
            isDisabled={loading}
          />
        ),
      )}
      <Button
        mt="6"
        width="100%"
        variant="solid"
        colorScheme="blue"
        type="submit"
        isDisabled={!isDirty || loading}
        isLoading={loading}
        loadingText={loadingText}
      >
        {submitText}
      </Button>
    </Form>
  );
};

export default ChapterForm;
