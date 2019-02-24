<template>
	<div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">
                    <Validate
                        formName="addController"
                        title="Добавление контроллера"
                        :schema="schema" ref="form"
                        @onSubmit="save"
                        @onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                 <div class="form-group">
                                    <label class="form-label f-b">Название точки продажи</label>
                                    <Field name="name" formName="addController" className="form-control" placeholder="Введите название точки продажи"/>
                                </div>
                                <div class="form-group">
                                    <label class="form-label f-b">Номер контроллера</label>
                                    <Field name="uid" formName="addController" className="form-control" placeholder="Введите номер контроллера"/>
                                </div>

                                <div class="form-group">
                                    <label class="form-label f-b">Модель автомата</label>
                                    <select class="form-control custom-select" v-model="input.equipmentId">
                                        <option v-for="equipment in equipments"
                                        :key="equipment.id" :value="equipment.id">
                                        {{ equipment.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label f-b">Состояние</label>
                                <div class="selectgroup w-100">
                                    <label class="selectgroup-item">
                                        <input type="radio" name="state" value="ENABLED"
                                        class="selectgroup-input" checked v-model="input.status"/>
                                        <span class="selectgroup-button">Активирован</span>
                                    </label>
                                    <label class="selectgroup-item">
                                        <input type="radio" name="state" value="DISABLED"
                                        class="selectgroup-input" v-model="input.status"/>
                                        <span class="selectgroup-button">Деактивирован</span>
                                    </label>
                                    <label class="selectgroup-item">
                                        <input type="radio" name="state" value="TRAINING"
                                        class="selectgroup-input" v-model="input.status"/>
                                        <span class="selectgroup-button">Обучение</span>
                                    </label>
                                    <label class="selectgroup-item">
                                        <input type="radio" name="state" value="PAUSED"
                                        class="selectgroup-input" v-model="input.status"/>
                                        <span class="selectgroup-button">Приостановлен</span>
                                    </label>
                                    <label class="selectgroup-item">
                                        <input type="radio" name="state" value="DEBUG"
                                        class="selectgroup-input" v-model="input.status"/>
                                        <span class="selectgroup-button">Отладка</span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label f-b">Тип связи</label>
                                <div class="selectgroup w-100">
                                    <label class="selectgroup-item">
                                        <input type="radio" name="connection" value="01"
                                        class="selectgroup-input" checked>
                                        <span class="selectgroup-button">3G</span>
                                    </label>
                                    <label class="selectgroup-item">
                                        <input type="radio" name="connection" value="02"
                                        class="selectgroup-input">
                                        <span class="selectgroup-button">WiFi</span>
                                    </label>
                                    <label class="selectgroup-item">
                                        <input type="radio" name="connection" value="03"
                                        class="selectgroup-input">
                                        <span class="selectgroup-button">Ethernet</span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label f-b">Режим работы</label>
                                <select class="form-control custom-select" v-model="input.mode">
                                    <option value="MDB">MDB</option>
                                    <option value="EXE">EXE</option>
                                    <option value="CASHLESS" selected>Cashless</option>
                                    <option value="CASHLESS_FREE" disabled>Cashless free</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label f-b">Режим безналичного устройства</label>
                                <select class="form-control custom-select">
                                    <option value="0" selected>Выберите режим</option>
                                    <option value="1">Монетник</option>
                                    <option value="2">Автомат</option>
                                    <option value="3">Монетник+автомат</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label f-b">Режим работы</label>
                                <select class="form-control custom-select">
                                    <option value="0" selected>Нет</option>
                                    <option value="1">ИНПАС</option>
                                    <option value="2">Сбербанк</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label f-b">Версия контроллера</label>
                                <select class="form-control custom-select" v-model="input.revisionId">
                                    <option v-for="revision in revisions"
                                    :key="revision.id" :value="revision.id">
                                    {{ revision.name }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label f-b">Фискальный регистратор</label>
                            <div class="input-group">
                                <input type="text" class="form-control" value="ККТ Казначей ФА"
                                placeholder="Выберите регистратор">
                                <span class="input-group-append">
                                    <button class="btn btn-dark"
                                    type="button">Настроить</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="submit">
                <button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
            </template>
        </Validate>
    </div>
</div>
</div>
</div>
</template>

<script>
	import gql from 'graphql-tag';

    import { required } from '@/utils/validation';

    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';

	export default {
		name: 'AddController',
        components: {
            Validate,
            Field
        },
		data: () => ({
			equipments: [],
            revisions: [],
            input: {
                status: "DISABLED",
                mode: "CASHLESS",
                equipmentId: 1,
                revisionId: 1
            },

            schema: {
                name: [required],
                uid: [required]
            }
		}),
		apollo: {
			equipments: {
				query: gql`
					query {
						getEquipments {
							id,
							name
						}
					}
				`,
				update (data) {
					return data.getEquipments;
				}
			},
            revisions: {
                query: gql`
                    query {
                        getRevisions {
                            id,
                            name
                        }
                    }
                `,
                update (data) {
                    return data.getRevisions;
                }
            }
		},
        methods: {
            async save () {
                try {
                    const { errors } = await this.$apollo.mutate({
                        mutation: gql`
                        mutation saveController ($data: CreateControllerInput!) {
                            createController (input: $data) {
                                name
                            }
                        }
                        `,
                        variables: {
                            data: {
                                ...this.input,
                                ...this.$store.getters['cache/data']
                            }
                        }
                    });
                    
                    this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
                } catch (error) {
                    this.$refs.form.showMessage('error', 'Ошибка сервера.');
                }
            },
            onSuccess () {
                const router = this.$router;
                setTimeout(function () { router.push('/controllers'); }, 1000);
            }
        }
	}
</script>
