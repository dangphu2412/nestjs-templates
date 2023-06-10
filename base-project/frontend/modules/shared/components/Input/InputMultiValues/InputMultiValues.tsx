import React, { forwardRef } from 'react';
import classnames from 'classnames';
import unique from 'lodash.uniq';
import { Key } from '@/modules/shared/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import classes from './InputMutipleValues.module.scss';

type InputTransformer = (input: string) => string;

type InputMultipleValueProps = React.ComponentProps<'input'> & {
  defaultValues?: string[];
  removeIcon?: React.ReactNode;
  multiValueSplitter?: string | RegExp;
  onAddChange?(items: string[]): void;
  onDeleteChange?(items: string[]): void;
  typingInputTransformers?: InputTransformer[];
  isResetAll?: boolean;
  inputValues?: string[];
};

export const InputMultipleValues = forwardRef<
  HTMLInputElement,
  InputMultipleValueProps
>(function InputMultipleValue(
  {
    defaultValues = [],
    multiValueSplitter = /[,\n]/gi,
    removeIcon,
    placeholder,
    onAddChange,
    onDeleteChange,
    typingInputTransformers,
    isResetAll,
    className,
    inputValues = [],
    ...props
  }: InputMultipleValueProps,
  ref
): React.ReactElement {
  const [values, setValues] = React.useState<string[]>(defaultValues);
  const [typingValue, setTypingValue] = React.useState('');

  const transformers: InputTransformer[] = React.useMemo(() => {
    function removeSpecialChar(value: string): string {
      const REMOVE_ADD_NEW_VALUE_CHAR_REGEX = /[,\s]/gi;

      return value.replace(REMOVE_ADD_NEW_VALUE_CHAR_REGEX, '');
    }

    return [removeSpecialChar, ...(typingInputTransformers ?? [])];
  }, [typingInputTransformers]);

  function transformValue(value: string): string {
    return transformers.reduce(
      (currentValue, transform) => transform(currentValue),
      value
    );
  }

  function addNewValue(newValue: string): void {
    const newValues = newValue ? [...values, newValue] : values;

    setValues(newValues);
    setTypingValue('');

    onAddChange?.(newValues);
  }

  function handleDeleteItem(deleteItemIndex: number) {
    const newValues = values.filter((_, index) => index !== deleteItemIndex);

    setValues(newValues);

    onDeleteChange?.(newValues);
  }

  function handleKeyPress({
    currentTarget,
    key
  }: React.KeyboardEvent<HTMLInputElement>) {
    const ADD_NEW_VALUES_KEYS = [Key.SPACE, Key.COMMA, Key.ENTER];
    const { value } = currentTarget;

    if (ADD_NEW_VALUES_KEYS.includes(key as Key)) {
      addNewValue(value);
      return;
    }

    if (Key.DEL === (key as Key)) {
      if (value !== '') {
        return;
      }

      handleDeleteItem(values.length - 1);
    }
  }

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const transformedValue = transformValue(event.target.value);

    setTypingValue(transformedValue);
  }

  function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    addNewValue(event.target.value);
  }

  function handlePasteMultipleValues(
    event: React.ClipboardEvent<HTMLInputElement>
  ) {
    event.stopPropagation();
    event.preventDefault();

    const clipboardText = event.clipboardData.getData('text').trim();

    if (!clipboardText) {
      return;
    }

    const newValues = unique(
      clipboardText
        .split(multiValueSplitter)
        .map(transformValue)
        .filter(value => value.trim() !== '')
    );

    setValues(newValues);
  }

  React.useEffect(() => {
    if (isResetAll) {
      setTypingValue('');
      setValues([]);
    }
  }, [isResetAll]);

  React.useEffect(() => {
    setValues(inputValues);
  }, [inputValues]);

  return (
    <div className={classnames(classes['input-container'], className)}>
      {values.map((item, index) => (
        <span
          key={`${item}${index}`}
          className={classes['tag-item']}
          onClick={() => handleDeleteItem(index)}
        >
          {item}

          <span className={classes['remove-icon']} data-cy="remove-icon">
            {removeIcon ?? <FontAwesomeIcon icon={faRemove} />}
          </span>
        </span>
      ))}

      <input
        placeholder={values.length ? '' : placeholder}
        className={classnames(
          classes['tag-input'],
          values.length
            ? classes['tag-input-width']
            : classes['placeholder-width']
        )}
        onKeyDown={handleKeyPress}
        onChange={handleValueChange}
        onBlur={handleOnBlur}
        onPaste={handlePasteMultipleValues}
        value={typingValue}
        ref={ref}
        {...props}
      />
    </div>
  );
});
