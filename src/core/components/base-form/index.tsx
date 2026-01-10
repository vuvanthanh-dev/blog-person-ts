import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import clsx from "clsx";
import Select from "react-select";
import { Form, Row, Col } from "react-bootstrap";
import { TEXT, SELECT, BUTTON, EDITOR } from "@/core/constants/form.constant";
import type { ButtonProps } from "@/core/types/button.type";
import type { BaseFormComponentProps } from "@/core/types/config-form.type";
import styles from "./_base-form.module.scss";
import ButtonComponent from "../button";
import EditorComponent from "../editor";

const BaseFormComponent: React.FC<BaseFormComponentProps> = (props) => {
  const {
    formConfig,
    values,
    onSubmit = () => {},
    onChange = () => {},
    options,
    handlers,
    handleBlur,
  } = props;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: values || {},
  });

  useEffect(() => {
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [values, setValue]);

  return (
    <div className={styles["form-container"]}>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row>
          {formConfig.fields.map((field: any, index: number) => {
            if (field.type === TEXT) {
              return (
                <Col
                  key={`form-${index}-Zm9ybS1jb250YWluZXIgYmxvZyBwZXJzb24K`}
                  md={field.size}
                  xs={12}
                  className="mb-3"
                >
                  <Form.Group controlId={field.name}>
                    <Form.Label>
                      {field.label}
                      {field?.required && (
                        <span className={styles["form-required"]}>*</span>
                      )}
                    </Form.Label>
                    <Form.Control
                      className="shadow-none"
                      type={field?.isPassword ? "password" : field.type}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      isInvalid={!!errors[field.name]}
                      {...register(field.name, {
                        ...field.validation,
                        onChange: (e) => {
                          const value = e.target.value;
                          setValue(field.name, value);
                          onChange({ [field.name]: value });
                        },
                        onBlur: (e) => {
                          const value = e.target.value;
                          setValue(field.name, value);
                          handleBlur?.({ [field.name]: value });
                        },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[field.name]?.message as string}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              );
            }

            if (field.type === SELECT) {
              return (
                <Col
                  key={`form-${index}-Zm9ybS1zZWxlY3QgYmxvZyBwZXJzb24K`}
                  md={field.size}
                  xs={12}
                  className="mb-3"
                  style={field?.style || {}}
                >
                  <Form.Group controlId={field.name}>
                    <Form.Label>
                      {field.label}
                      {field?.required && (
                        <span className={styles["form-required"]}>*</span>
                      )}
                    </Form.Label>

                    <Controller
                      control={control}
                      name={field.name}
                      rules={field.validation}
                      render={({ field: { ref, onBlur } }) => (
                        <Select
                          ref={ref}
                          options={options?.[field.option] || []}
                          placeholder={field.placeholder}
                          isDisabled={field.disabled}
                          isMulti={field?.isMulti || false}
                          value={values?.[field.name] ?? null}
                          onChange={(selectedOption) => {
                            onChange({ [field.name]: selectedOption });
                            setValue(field.name, selectedOption);
                          }}
                          onBlur={onBlur}
                          classNamePrefix="react-select"
                          className={clsx({
                            "is-invalid": !!errors[field.name],
                          })}
                        />
                      )}
                    />

                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors[field.name]?.message as string}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              );
            }

            {
              if (field.type === EDITOR) {
                return (
                  <Col
                    md={field.size}
                    xs={12}
                    className="mb-3"
                    style={field?.style || {}}
                    key={`form-${index}-monacaZm9ybS1lZGl0ZXIgYmxvZyBwZXJzb24K`}
                  >
                    <Form.Group controlId={field.name}>
                      <Form.Label>
                        {field.label}
                        {field?.required && (
                          <span className={styles["form-required"]}>*</span>
                        )}
                      </Form.Label>

                      <Controller
                        name={field.name}
                        control={control}
                        defaultValue={values?.[field.name] || ""}
                        render={({ field: { value } }) => (
                          <EditorComponent
                            value={value}
                            name={field.name}
                            disabled={field.disabled}
                            onChange={(content) => {
                              setValue(field.name, content);
                              onChange?.({ [field.name]: content });
                            }}
                          />
                        )}
                      />
                      {errors[field.name] && (
                        <div className="invalid-feedback d-block">
                          {errors[field.name]?.message as string}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                );
              }
            }

            if (field.type === BUTTON) {
              return (
                <Col
                  key={`form-${index}-Zm9ybS1idXR0b24gYmxvZyBwZXJzb24K`}
                  md={field.size}
                  xs={12}
                  className={clsx("mb-3", styles["form-btn-container"])}
                  style={field?.style || {}}
                >
                  {field.childs.map(
                    (child: ButtonProps, childIndex: number) => {
                      if (child.type === "button") {
                        const onClickHandler = handlers?.[child.action];

                        return (
                          <ButtonComponent
                            key={`form-button-${childIndex}-Zm9ybS1idXR0b24tY2hpbGQgYmxvZyBwZXJzb24K`}
                            type="button"
                            disabled={child.disabled}
                            className="me-2"
                            style={child?.style || {}}
                            onClick={(
                              event: React.MouseEvent<HTMLButtonElement>
                            ) => {
                              event.preventDefault();
                              if (typeof onClickHandler === "function") {
                                onClickHandler();
                              }
                            }}
                            title={child.title}
                            action={child.action}
                          />
                        );
                      }
                      return (
                        <ButtonComponent
                          key={`form-button-${childIndex}-Zm9ybS1idXR0b24tc3VibWl0IGJsb2cgcGVyc29uCg==`}
                          type="submit"
                          disabled={child.disabled}
                          className="me-2"
                          style={child?.style || {}}
                          title={child.title}
                          action={child.action}
                        />
                      );
                    }
                  )}
                </Col>
              );
            }

            return null;
          })}
        </Row>
      </Form>
    </div>
  );
};

export default BaseFormComponent;
