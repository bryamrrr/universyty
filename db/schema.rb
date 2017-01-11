# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170105175535) do

  create_table "alternatives", force: :cascade do |t|
    t.integer  "question_id"
    t.text     "content"
    t.boolean  "correct_answer"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["question_id"], name: "index_alternatives_on_question_id"
  end

  create_table "bonos", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.string   "logo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "slug"
  end

  create_table "countries", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses", force: :cascade do |t|
    t.integer  "category_id"
    t.string   "title"
    t.text     "description"
    t.text     "goal"
    t.boolean  "starred"
    t.decimal  "pricetag"
    t.string   "duration"
    t.string   "background_url"
    t.string   "video_url"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "priority"
    t.decimal  "discount"
    t.boolean  "published"
    t.boolean  "free"
    t.string   "certificate_info"
    t.string   "level"
    t.string   "classes"
    t.index ["category_id"], name: "index_courses_on_category_id"
  end

  create_table "departments", force: :cascade do |t|
    t.string   "name"
    t.integer  "country_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_departments_on_country_id"
  end

  create_table "descriptions", force: :cascade do |t|
    t.integer  "information_id"
    t.text     "content"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["information_id"], name: "index_descriptions_on_information_id"
  end

  create_table "enrollments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "course_id"
    t.integer  "first_score"
    t.integer  "second_score"
    t.integer  "third_score"
    t.integer  "current_module"
    t.integer  "current_video"
    t.boolean  "certificate_requested"
    t.string   "certificate_url"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["course_id"], name: "index_enrollments_on_course_id"
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "features", force: :cascade do |t|
    t.integer  "plan_id"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["plan_id"], name: "index_features_on_plan_id"
  end

  create_table "information", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.string   "background_url"
    t.string   "link_url"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "movements", force: :cascade do |t|
    t.integer  "bono_id"
    t.integer  "type_id"
    t.integer  "paymethod_id"
    t.integer  "user_id"
    t.integer  "transferred_user"
    t.integer  "transferred_level"
    t.string   "status"
    t.decimal  "total"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["bono_id"], name: "index_movements_on_bono_id"
    t.index ["paymethod_id"], name: "index_movements_on_paymethod_id"
    t.index ["type_id"], name: "index_movements_on_type_id"
    t.index ["user_id"], name: "index_movements_on_user_id"
  end

  create_table "parts", force: :cascade do |t|
    t.integer  "course_id"
    t.string   "title"
    t.integer  "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_parts_on_course_id"
  end

  create_table "paymethods", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "plans", force: :cascade do |t|
    t.string   "cta"
    t.decimal  "pricetag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "professors", force: :cascade do |t|
    t.integer  "course_id"
    t.string   "name"
    t.text     "bio"
    t.string   "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_professors_on_course_id"
  end

  create_table "provinces", force: :cascade do |t|
    t.string   "name"
    t.integer  "department_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["department_id"], name: "index_provinces_on_department_id"
  end

  create_table "questions", force: :cascade do |t|
    t.integer  "quiz_id"
    t.text     "content"
    t.integer  "answers_number"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.integer  "part_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["part_id"], name: "index_quizzes_on_part_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "sponsored"
    t.string   "type"
    t.boolean  "new"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "level"
    t.index ["user_id"], name: "index_teams_on_user_id"
  end

  create_table "tokens", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "token"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tokens_on_user_id"
  end

  create_table "topics", force: :cascade do |t|
    t.integer  "part_id"
    t.string   "title"
    t.string   "video_url"
    t.integer  "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["part_id"], name: "index_topics_on_part_id"
  end

  create_table "types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.integer  "role_id"
    t.integer  "province_id"
    t.integer  "sponsor_id"
    t.string   "nickname"
    t.string   "fullname"
    t.string   "email"
    t.string   "encrypted_password"
    t.string   "salt"
    t.string   "dni"
    t.string   "address"
    t.string   "gender"
    t.string   "phone"
    t.string   "first_name"
    t.string   "last_name"
    t.boolean  "first_entry"
    t.decimal  "balance"
    t.decimal  "historical_balance"
    t.boolean  "preferencial"
    t.boolean  "ambassador"
    t.boolean  "ambassador_active"
    t.boolean  "ambassador_start"
    t.integer  "login_attempts"
    t.boolean  "block"
    t.date     "paydate"
    t.boolean  "paydate_expire"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "sponsor"
    t.index ["province_id"], name: "index_users_on_province_id"
    t.index ["role_id"], name: "index_users_on_role_id"
  end

end
