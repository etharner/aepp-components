<template>
  <div class="ae-labelled-text-input">
    <div class="top-container">
      <label class="label" v-if="!!label" :for="internalInputId">{{label}}</label>
      <span
        class="top-message _type_error"
        v-if="!!_errorMessage"
        ref="errorMessage"
      >
        {{_errorMessage}}
      </span>
      <span
        class="top-message _type_valid"
        ref="validMessage"
        v-if="!!_validMessage"
      >
        {{_validMessage}}
      </span>
    </div>
    <ae-validated-text-input
      :inputId="internalInputId"
      :validateOnBlur="validateOnBlur"
      :validateOnInput="validateOnInput"
      :value="internalValue"
      :placeholder="placeholder"
      @blur="onBlur"
      @clearRequest="clearInput"
      @input="onInput"
      @validation="onValidate"
      @focus="onFocus"
      @keydown="forwardKeyEvent"
      @keyup="forwardKeyEvent"
      @keypress="forwardKeyEvent"
    />
  </div>
</template>
<script src="./aeLabelledTextInput.js"/>
<style scoped lang="scss" src="./aeLabelledTextInput.scss"/>
