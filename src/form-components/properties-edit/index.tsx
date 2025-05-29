import React, { useState } from 'react';

import { Button } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';

import { JsonSchema } from '../../typings';
import { useNodeRenderContext } from '../../hooks';
import { PropertyEdit } from './property-edit';

export interface PropertiesEditProps {
  value?: Record<string, JsonSchema>;
  onChange: (value: Record<string, JsonSchema>) => void;
  useFx?: boolean;
}

export const PropertiesEdit: React.FC<PropertiesEditProps> = (props) => {
  const value = (props.value || {}) as Record<string, JsonSchema>;
  const { readonly } = useNodeRenderContext();
  const [newProperty, updateNewPropertyFromCache] = useState<{ key: string; value: JsonSchema }>({
    key: '',
    value: { type: 'string' },
  });
  const [newPropertyVisible, setNewPropertyVisible] = useState<boolean>();
  const clearCache = () => {
    updateNewPropertyFromCache({ key: '', value: { type: 'string' } });
    setNewPropertyVisible(false);
  };
  const updateProperty = (
    propertyValue: JsonSchema,
    propertyKey: string,
    newPropertyKey?: string
  ) => {
    const newValue = { ...value };
    if (newPropertyKey) {
      delete newValue[propertyKey];
      newValue[newPropertyKey] = propertyValue;
    } else {
      newValue[propertyKey] = propertyValue;
    }
    props.onChange(newValue);
  };
  const updateNewProperty = (
    propertyValue: JsonSchema,
    propertyKey: string,
    newPropertyKey?: string
  ) => {
    // const newValue = { ...value }
    if (newPropertyKey) {
      if (!(newPropertyKey in value)) {
        updateProperty(propertyValue, propertyKey, newPropertyKey);
      }
      clearCache();
    } else {
      updateNewPropertyFromCache({
        key: newPropertyKey || propertyKey,
        value: propertyValue,
      });
    }
  };
  return (
    <>
      {Object.keys(props.value || {}).map((key) => {
        const property = (value[key] || {}) as JsonSchema;
        return (
          <PropertyEdit
            key={key}
            propertyKey={key}
            useFx={props.useFx}
            value={property}
            disabled={readonly}
            onChange={updateProperty}
            onDelete={() => {
              const newValue = { ...value };
              delete newValue[key];
              props.onChange(newValue);
            }}
          />
        );
      })}
      {newPropertyVisible && (
        <PropertyEdit
          propertyKey={newProperty.key}
          value={newProperty.value}
          useFx={props.useFx}
          onChange={updateNewProperty}
          onDelete={() => {
            const key = newProperty.key;
            // after onblur
            setTimeout(() => {
              const newValue = { ...value };
              delete newValue[key];
              props.onChange(newValue);
              clearCache();
            }, 10);
          }}
        />
      )}
      {!readonly && (
        <div>
          <Button
            theme="borderless"
            icon={<IconPlus />}
            onClick={() => setNewPropertyVisible(true)}
          >
            Add
          </Button>
        </div>
      )}
    </>
  );
};
