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
					<label for="company-director" class="company-settings__field-label">Директор</label>
					<Field id="company-director" className="company-settings__field" formName="company" type="text"
					placeholder="Директор" :value="info.director" name="director" />
				</div>

				<div class="company-settings__field-container">
					<label for="company-director-phone" class="company-settings__field-label">Телефон директора</label>
					<Field :masked="true" mask="\+\7 (111) 111 11-11"
					id="company-director-phone" className="company-settings__field" formName="company" type="tel"
					placeholder="Телефон директора" :value="info.directorPhone" name="directorPhone" />
				</div>

				<div class="company-settings__field-container">
					<label for="company-director-email" class="company-settings__field-label">Почта директора</label>
					<Field id="company-director-email" className="company-settings__field" formName="company"
					type="text" placeholder="Почта директора" :value="info.directorEmail" name="directorEmail" />
				</div>




				<div class="company-settings__field-container">
					<label for="company-contact-name" class="company-settings__field-label">Контактное лицо</label>
					<Field id="company-contact-name" className="company-settings__field" formName="company" type="text"
					placeholder="Контактное лицо" :value="info.contactPerson" name="contactPerson" />
				</div>

				<div class="company-settings__field-container">
					<label for="company-contact-phone" class="company-settings__field-label">Контактный телефон</label>
					<Field :masked="true" mask="\+\7 (111) 111 11-11" id="company-contact-phone"
					className="company-settings__field" formName="company" type="tel"
					placeholder="Контактный телефон" :value="info.contactPhone" name="contactPhone" />
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
							legalInfo {
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
								contactEmail
							}
						}
					}
				`,
				update: data => data.getProfile.legalInfo || {
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
					contactEmail: ''
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
				contactEmail: [required, email]
			}
		}),
		methods: {
			async save () {
				try {
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
									contactEmail
								}
							}
						`,
						variables: {
							input: this.$store.getters['cache/data']
						}
					});

					this.$refs.company.process({ errors, data, success: 'Успешно сохранено.' });
				} catch (error) {
					this.$refs.company.showMessage('error', 'Ошибка сохранения.');
				}
			},

			onSuccess ({ updateLegalInfo }) {
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
		display: flex;
		justify-content: flex-end;
	}
</style>
