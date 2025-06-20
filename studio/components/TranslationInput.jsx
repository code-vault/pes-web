import React from 'react';
import { TextArea, Stack, Text, Card } from '@sanity/ui';

export function TranslationInput(props) {
  const { value = '', onChange, schemaType } = props;
  
  return (
    <Stack space={3}>
      <TextArea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={schemaType.placeholder}
        rows={3}
      />
      {value && (
        <Card padding={3} tone="primary" border>
          <Text size={1}>
            Character count: {value.length}
            {value.length > 100 && ' (Consider shorter text for better UX)'}
          </Text>
        </Card>
      )}
    </Stack>
  );
}
