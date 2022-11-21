<template>
	<div>
		<div class="text-wrap">
			<div class="example top-buttons-container top-buttons">
				<div class="top-buttons__left-container" v-if="false">
					<a href="#" class="btn btn-primary">Управление сотрудниками</a>
				</div>
			</div>
		</div>

		<div class="company-settings">
			<Validate
				className="company-settings__form"
				:card="false"
				ref="company"
				formName="company"
				:schema="schema"
				@onSubmit="save"
				@onSuccess="onSuccess"
				v-if="info"
			>
				<div class="company-settings__field-container">
					<label for="company-name" class="company-settings__field-label">Название
					компании</label>
					<Field id="company-name" name="companyName" className="company-settings__field" type="text"
					placeholder="Название компании" formName="company" :value="info.companyName" />
				</div>

				<div class="company-settings__field-container">
					<label for="company-city"
					class="company-settings__field-label">Город</label>
					<Field id="company-city" className="company-settings__field" formName="company" type="text" name="city"
					placeholder="Город" :value="info.city"/>
				</div>

				<div class="company-settings__field-container">
					<label for="company-fact-address" class="company-settings__field-label">Адрес
					фактический</label>
					<Field id="company-fact-address" className="company-settings__field" formName="company" type="text"
					placeholder="Адрес фактический" :value="info.actualAddress" name="actualAddress"/>
				</div>

				<div class="company-settings__field-container">
					<label for="company-inn" class="company-settings__field-label">ИНН</label>
					<Field id="company-inn" className="company-settings__field" formName="company" type="text"
					placeholder="ИНН" name="inn" :value="info.inn"/>
				</div>

				<div class="company-settings__field-container">
					<label for="company-ogrn" class="company-settings__field-label">ОГРН</label>
					<Field id="company-ogrn" className="company-settings__field" formName="company" type="text"
					placeholder="ОГРН" name="ogrn" :value="info.ogrn" />
				</div>



        <div class="company-settings__field-container">
          <label for="company-legal-address" class="company-settings__field-label">Адрес
            юридический</label>
          <Field id="company-legal-address" className="company-settings__field" formName="company"
                 type="text" placeholder="Адрес юридический" :value="info.legalAddress" name="legalAddress"/>
        </div>




        <div class="company-settings__field-container">
          <label for="company-kpp" class="company-settings__field-label">КПП</label>
          <Field id="company-kpp" className="company-settings__field" formName="company" type="text"
                 placeholder="КПП" name="kpp" :value="info.kpp"/>
        </div>




        <div class="company-settings__field-container">
          <label for="company-sno" class="company-settings__field-label">Система налогообложения</label>
          <select id="company-sno" v-model="info.sno" class="form-control custom-select">
            <option value="usn_income">УСН доходы</option>
            <option value="usn_income_outcome">УСН доходы-расходы</option>
            <option value="envd">ЕНВД</option>
            <option value="patent">Патент</option>
            <option value="osn">ОСН</option>
            <option value="esn">ЕСН</option>

          </select>
        </div>

        <div class="company-settings__field-container">
          <label for="company-time" class="company-settings__field-label">Часовой пояс</label>
          <select id="company-time" v-model="info.timeZone" class="form-control custom-select">
            <option value="0">UTC</option>
            <option value="1">UTC +1</option>
            <option value="2">UTC +2</option>
            <option value="3">UTC +3 (МСК)</option>
            <option value="4">UTC +4</option>
            <option value="5">UTC +5</option>
            <option value="6">UTC +6</option>
            <option value="7">UTC +7</option>
            <option value="8">UTC +8</option>
            <option value="9">UTC +9</option>
            <option value="10">UTC +10</option>
            <option value="11">UTC +11</option>
            <option value="12">UTC +12</option>

          </select>
        </div>



				<div class="company-settings__field-container">
					<label for="company-director" class="company-settings__field-label">Директор</label>
					<Field id="company-director" className="company-settings__field" formName="company" type="text"
					placeholder="Директор" :value="info.director" name="director" />
				</div>

				<div class="company-settings__field-container">
					<label for="company-director-phone" class="company-settings__field-label">Телефон директора</label>
          <div class="row"><div class="auth-block__field-container  col-3"><div class="auth-block__field" :disabled="true">
            {{ '+'+info.countryCode }}</div></div>
            <div class="auth-block__field-container auth-block__field-container col-9">

              <Field id="company-director-phone" :newmasked="true" className="company-settings__field" type="tel" :value="info.directorPhone" name="directorPhone" placeholder="Телефон директора" mask="\(999) 999-99-99" formName="company"  />
            </div></div>
				</div>

				<div class="company-settings__field-container">
					<label for="company-director-email" class="company-settings__field-label">Почта директора</label>
					<Field id="company-director-email" className="company-settings__field" formName="company"
					type="text" placeholder="Почта директора" :value="info.directorEmail" name="directorEmail" />
				</div>




				<div class="company-settings__field-container ">
					<label for="company-contact-name" class="company-settings__field-label">Контактное лицо</label>
					<Field id="company-contact-name" className="company-settings__field" formName="company" type="text"
					placeholder="Контактное лицо" :value="info.contactPerson" name="contactPerson" />
				</div>

				<div class="company-settings__field-container">

					<label for="company-contact-phone" class="company-settings__field-label">Контактный телефон</label>
          <div class="row"><div class="auth-block__field-container  col-3"><div class="auth-block__field" :disabled="true">
            {{ '+'+info.countryCode }}</div></div>
            <div class="auth-block__field-container auth-block__field-container col-9">

              <Field  id="company-contact-phone" :newmasked="true" className="company-settings__field" type="tel" :value="info.contactPhone" name="contactPhone" placeholder="Контактный телефон" mask="\(999) 999-99-99" formName="company"  />
            </div></div>
				</div>

				<div class="company-settings__field-container">
					<label for="company-contact-email" class="company-settings__field-label">Контактная почта</label>
					<Field id="company-contact-email" className="company-settings__field" formName="company"
					type="text" placeholder="Контактная почта" :value="info.contactEmail" name="contactEmail" />
				</div>

			</Validate>

			<div class="row gutters-xs company__save-button">
				<span class="col-auto">
					<button class="btn btn-primary" type="button" @click.prevent="$refs.company.submit">Сохранить</button>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import { required, email, number } from '@/utils/validation';

	import Validate from '@/modules/validation/Validate';
	import Field from '@/modules/validation/Field';

	export default {
		name: 'Company',
		components: {
			Validate,
			Field
		},
		apollo: {
			info: {
				query: gql`
					query {
						getProfile {
						  countryCode
							legalInfo {
								companyName,
								city,
								actualAddress,
								inn,
								ogrn,
								kpp,
								timeZone,
								legalAddress,
								director,
								directorPhone,
								directorEmail,
								contactPerson,
								contactPhone,
								contactEmail,
								sno
							}
						}
					}
				`,
				update: data => {
          if (data.getProfile.legalInfo){
            data.getProfile.legalInfo.countryCode = data.getProfile.countryCode
            return data.getProfile.legalInfo
          } else {

            return {
              companyName: '',
              city: '',
              actualAddress: '',
              inn: '',
              ogrn: '',
              legalAddress: '',
              director: '',
              directorPhone: '',
              directorEmail: '',
              contactPerson: '',
              contactPhone: '',
              contactEmail: '',
              sno: '',
              countryCode: data.getProfile.countryCode
            }
          }
        }
			}
		},
		data: () => ({
			info: null,
			schema: {
				companyName: [required],
				city: [required],
				actualAddress: [required],
				inn: [required, number],
				ogrn: [required],
				legalAddress: [required],
				director: [required],
				directorPhone: [required],
				directorEmail: [required, email],
				contactPerson: [required],
				contactPhone: [required],
				contactEmail: [required, email],
				sno: [required],
			}
		}),
		methods: {
			async save () {
			  if(!this.info.timeZone){
          this.info.timeZone = "3"
        }
				try {
					const cache = this.$store.getters['cache/data'];

					const { errors, data } = await this.$apollo.mutate({
						mutation: gql`
							mutation saveCompanyInfo ($input: LegalInfoInput!) {
								updateLegalInfo(input: $input) {
									companyName,
									city,
									actualAddress,
									inn,
									ogrn,
									legalAddress,
									director,
									directorPhone,
									directorEmail,
									contactPerson,
									contactPhone,
									contactEmail,
									sno,
									timeZone,
									kpp
								}
							}
						`,
						variables: {
							input: {
								...cache,
								directorPhone: cache.directorPhone.replace(/[()+\s-]/gi, ''),
								contactPhone: cache.contactPhone.replace(/[()+\s-]/gi, ''),
								sno: this.info.sno,
                timeZone: this.info.timeZone
							}
						}
					});

					setTimeout(async ()=>{

            await this.$store.dispatch('user/fetch')

          }, 3000)

          this.$refs.company.process({ errors, data, success: 'Успешно сохранено.' });


				} catch (error) {
					this.$refs.company.showMessage('error', 'Ошибка сохранения.');
				}
			},

			onSuccess ({ updateLegalInfo }) {
        updateLegalInfo.countryCode = this.info.countryCode
				this.info = updateLegalInfo;
			}
		}
	}
</script>

<style scoped lang="scss">
	.top-buttons {
		justify-content: flex-end;
	}

	.company__save-button {
		padding: 0 1.5rem 20px;
	}
</style>
