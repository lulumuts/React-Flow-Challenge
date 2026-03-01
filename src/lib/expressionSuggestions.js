/**
 * Turn.io expression suggestions for @mention-style autocomplete.
 * Models contact as an object with properties; supports object-aware search.
 * @see https://whatsapp.turn.io/docs/journeys/expressions
 * @see https://whatsapp.turn.io/docs/api/contacts
 */

import { CONTACT_PROPERTIES } from './turnioExpressionSchema';

function toContactSuggestions(filterBy = '') {
  const q = filterBy.toLowerCase().trim();
  return CONTACT_PROPERTIES.filter(
    (p) =>
      !q ||
      p.display.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q)
  ).map((p) => ({
    id: `contact.${p.name}`,
    label: `Contact > ${p.display}`,
    displayLabel: p.display,
    type: p.type,
    category: 'contact'
  }));
}

const FUNCTION_SUGGESTIONS = [
  // String functions
  { id: 'base64_decode(thing)', label: 'base64_decode(thing)', category: 'string' },
  { id: 'base64_encode(thing)', label: 'base64_encode(thing)', category: 'string' },
  { id: 'char(code)', label: 'char(code)', category: 'string' },
  { id: 'clean(binary)', label: 'clean(binary)', category: 'string' },
  { id: 'code(thing)', label: 'code(thing)', category: 'string' },
  { id: 'concatenate(argument1, argument2, argument3)', label: 'concatenate(argument1, argument2, argument3)', category: 'string' },
  { id: 'find_exact_match(input, keyword_set)', label: 'find_exact_match(input, keyword_set)', category: 'string' },
  { id: 'find_fuzzy_matches(input, keyword_threshold_set)', label: 'find_fuzzy_matches(input, keyword_threshold_set)', category: 'string' },
  { id: 'find_fuzzy_matches(input, keyword_set, threshold)', label: 'find_fuzzy_matches(input, keyword_set, threshold)', category: 'string' },
  { id: 'first_word(binary)', label: 'first_word(binary)', category: 'string' },
  { id: 'get_brief(phrase)', label: 'get_brief(phrase)', category: 'string' },
  { id: 'get_brief(phrase, num_chars)', label: 'get_brief(phrase, num_chars)', category: 'string' },
  { id: 'has_all_words(haystack, words)', label: 'has_all_words(haystack, words)', category: 'string' },
  { id: 'has_any_beginning(text, prefixes)', label: 'has_any_beginning(text, prefixes)', category: 'string' },
  { id: 'has_any_end(text, end_texts)', label: 'has_any_end(text, end_texts)', category: 'string' },
  { id: 'has_any_exact_phrase(text, phrases)', label: 'has_any_exact_phrase(text, phrases)', category: 'string' },
  { id: 'has_any_phrase(text, phrases)', label: 'has_any_phrase(text, phrases)', category: 'string' },
  { id: 'has_any_word(haystack, words)', label: 'has_any_word(haystack, words)', category: 'string' },
  { id: 'has_beginning(text, beginning)', label: 'has_beginning(text, beginning)', category: 'string' },
  { id: 'has_date(expression)', label: 'has_date(expression)', category: 'string' },
  { id: 'has_date_eq(expression, date_string)', label: 'has_date_eq(expression, date_string)', category: 'string' },
  { id: 'has_date_gt(expression, date_string)', label: 'has_date_gt(expression, date_string)', category: 'string' },
  { id: 'has_date_lt(expression, date_string)', label: 'has_date_lt(expression, date_string)', category: 'string' },
  { id: 'has_email(expression)', label: 'has_email(expression)', category: 'string' },
  { id: 'has_end(text, end_text)', label: 'has_end(text, end_text)', category: 'string' },
  { id: 'has_number(expression)', label: 'has_number(expression)', category: 'string' },
  { id: 'has_number_eq(expression, float)', label: 'has_number_eq(expression, float)', category: 'string' },
  { id: 'has_number_gt(expression, float)', label: 'has_number_gt(expression, float)', category: 'string' },
  { id: 'has_number_gte(expression, float)', label: 'has_number_gte(expression, float)', category: 'string' },
  { id: 'has_number_lt(expression, float)', label: 'has_number_lt(expression, float)', category: 'string' },
  { id: 'has_number_lte(expression, float)', label: 'has_number_lte(expression, float)', category: 'string' },
  { id: 'has_only_phrase(expression, phrase)', label: 'has_only_phrase(expression, phrase)', category: 'string' },
  { id: 'has_only_text(expression_one, expression_two)', label: 'has_only_text(expression_one, expression_two)', category: 'string' },
  { id: 'has_pattern(expression, pattern)', label: 'has_pattern(expression, pattern)', category: 'string' },
  { id: 'has_phone(expression)', label: 'has_phone(expression)', category: 'string' },
  { id: 'has_phone(expression, country_code)', label: 'has_phone(expression, country_code)', category: 'string' },
  { id: 'has_phrase(expression, phrase)', label: 'has_phrase(expression, phrase)', category: 'string' },
  { id: 'has_text(expression)', label: 'has_text(expression)', category: 'string' },
  { id: 'has_time(expression)', label: 'has_time(expression)', category: 'string' },
  { id: 'html_to_markdown(html)', label: 'html_to_markdown(html)', category: 'string' },
  { id: 'left(binary, size)', label: 'left(binary, size)', category: 'string' },
  { id: 'len(binary)', label: 'len(binary)', category: 'string' },
  { id: 'levenshtein_distance(first_phrase, second_phrase)', label: 'levenshtein_distance(first_phrase, second_phrase)', category: 'string' },
  { id: 'lower(binary)', label: 'lower(binary)', category: 'string' },
  { id: 'mid(text, start_num, num_chars)', label: 'mid(text, start_num, num_chars)', category: 'string' },
  { id: 'normalise_text(phrase)', label: 'normalise_text(phrase)', category: 'string' },
  { id: 'normalise_whitespace(phrase)', label: 'normalise_whitespace(phrase)', category: 'string' },
  { id: 'proper(binary)', label: 'proper(binary)', category: 'string' },
  { id: 'read_digits(binary)', label: 'read_digits(binary)', category: 'string' },
  { id: 'regex_capture(binary, pattern)', label: 'regex_capture(binary, pattern)', category: 'string' },
  { id: 'regex_named_capture(binary, pattern)', label: 'regex_named_capture(binary, pattern)', category: 'string' },
  { id: 'remove_emojis(phrase)', label: 'remove_emojis(phrase)', category: 'string' },
  { id: 'remove_first_word(binary)', label: 'remove_first_word(binary)', category: 'string' },
  { id: 'remove_first_word(binary, separator)', label: 'remove_first_word(binary, separator)', category: 'string' },
  { id: 'remove_last_word(binary)', label: 'remove_last_word(binary)', category: 'string' },
  { id: 'remove_last_word(binary, separator)', label: 'remove_last_word(binary, separator)', category: 'string' },
  { id: 'remove_numbers(phrase)', label: 'remove_numbers(phrase)', category: 'string' },
  { id: 'remove_punc(phrase)', label: 'remove_punc(phrase)', category: 'string' },
  { id: 'replace_punc(phrase)', label: 'replace_punc(phrase)', category: 'string' },
  { id: 'rept(value, amount)', label: 'rept(value, amount)', category: 'string' },
  { id: 'right(binary, size)', label: 'right(binary, size)', category: 'string' },
  { id: 'split(binary)', label: 'split(binary)', category: 'string' },
  { id: 'split(binary, pattern)', label: 'split(binary, pattern)', category: 'string' },
  { id: 'substitute(subject, pattern, replacement)', label: 'substitute(subject, pattern, replacement)', category: 'string' },
  { id: 'unichar(code)', label: 'unichar(code)', category: 'string' },
  { id: 'unicode(letter)', label: 'unicode(letter)', category: 'string' },
  { id: 'upper(binary)', label: 'upper(binary)', category: 'string' },
  { id: 'url_decode(thing)', label: 'url_decode(thing)', category: 'string' },
  { id: 'url_encode(thing)', label: 'url_encode(thing)', category: 'string' },
  { id: 'word(binary, n)', label: 'word(binary, n)', category: 'string' },
  { id: 'word(binary, n, by_spaces)', label: 'word(binary, n, by_spaces)', category: 'string' },
  { id: 'word_count(binary)', label: 'word_count(binary)', category: 'string' },
  { id: 'word_count(binary, by_spaces)', label: 'word_count(binary, by_spaces)', category: 'string' },
  { id: 'word_slice(binary, start)', label: 'word_slice(binary, start)', category: 'string' },
  { id: 'word_slice(binary, start, stop)', label: 'word_slice(binary, start, stop)', category: 'string' },
  { id: 'word_slice(binary, start, stop, by_spaces)', label: 'word_slice(binary, start, stop, by_spaces)', category: 'string' },
  // Number functions
  { id: 'abs(number)', label: 'abs(number)', category: 'number' },
  { id: 'fixed(number, precision)', label: 'fixed(number, precision)', category: 'number' },
  { id: 'fixed(number, precision, no_commas)', label: 'fixed(number, precision, no_commas)', category: 'number' },
  { id: 'max(argument1, argument2, argument3)', label: 'max(argument1, argument2, argument3)', category: 'number' },
  { id: 'min(argument1, argument2, argument3)', label: 'min(argument1, argument2, argument3)', category: 'number' },
  { id: 'parse_float(number)', label: 'parse_float(number)', category: 'number' },
  { id: 'parse_float(binary)', label: 'parse_float(binary)', category: 'number' },
  { id: 'percent(float)', label: 'percent(float)', category: 'number' },
  { id: 'power(a, b)', label: 'power(a, b)', category: 'number' },
  { id: 'rand_between(min, max)', label: 'rand_between(min, max)', category: 'number' },
  { id: 'rem(integer1, integer2)', label: 'rem(integer1, integer2)', category: 'number' },
  { id: 'round(value)', label: 'round(value)', category: 'number' },
  { id: 'round(value, places)', label: 'round(value, places)', category: 'number' },
  { id: 'sum(argument1, argument2, argument3)', label: 'sum(argument1, argument2, argument3)', category: 'number' },
  // Date functions
  { id: 'date(year, month, day)', label: 'date(year, month, day)', category: 'date' },
  { id: 'datetime_add(datetime, offset, unit)', label: 'datetime_add(datetime, offset, unit)', category: 'date' },
  { id: 'datetime_from_unix(unix, unit)', label: 'datetime_from_unix(unix, unit)', category: 'date' },
  { id: 'datetime_next(desired_day, time)', label: 'datetime_next(desired_day, time)', category: 'date' },
  { id: 'datetime_next(desired_day, time, base_date)', label: 'datetime_next(desired_day, time, base_date)', category: 'date' },
  { id: 'datevalue(date)', label: 'datevalue(date)', category: 'date' },
  { id: 'datevalue(date, format)', label: 'datevalue(date, format)', category: 'date' },
  { id: 'day(date)', label: 'day(date)', category: 'date' },
  { id: 'edate(date, months)', label: 'edate(date, months)', category: 'date' },
  { id: 'hour(date)', label: 'hour(date)', category: 'date' },
  { id: 'minute(date)', label: 'minute(date)', category: 'date' },
  { id: 'month(date)', label: 'month(date)', category: 'date' },
  { id: 'now()', label: 'now()', category: 'date' },
  { id: 'parse_datevalue(datetime, format)', label: 'parse_datevalue(datetime, format)', category: 'date' },
  { id: 'right_now', label: 'right_now', category: 'date' },
  { id: 'second(date)', label: 'second(date)', category: 'date' },
  { id: 'time(hours, minutes, seconds)', label: 'time(hours, minutes, seconds)', category: 'date' },
  { id: 'timevalue(expression)', label: 'timevalue(expression)', category: 'date' },
  { id: 'today()', label: 'today()', category: 'date' },
  { id: 'weekday(date)', label: 'weekday(date)', category: 'date' },
  { id: 'year(date)', label: 'year(date)', category: 'date' },
  // Enum/List functions
  { id: 'append(list, payload)', label: 'append(list, payload)', category: 'enum' },
  { id: 'chunk_every(enumerable, count)', label: 'chunk_every(enumerable, count)', category: 'enum' },
  { id: 'count(term)', label: 'count(term)', category: 'enum' },
  { id: 'delete(map, key)', label: 'delete(map, key)', category: 'enum' },
  { id: 'filter(enumerable, filter_fun)', label: 'filter(enumerable, filter_fun)', category: 'enum' },
  { id: 'find(enumerable, find_fun)', label: 'find(enumerable, find_fun)', category: 'enum' },
  { id: 'has_all_members(list, items)', label: 'has_all_members(list, items)', category: 'enum' },
  { id: 'has_any_member(list, items)', label: 'has_any_member(list, items)', category: 'enum' },
  { id: 'has_group(groups, uuid)', label: 'has_group(groups, uuid)', category: 'enum' },
  { id: 'has_member(list, item)', label: 'has_member(list, item)', category: 'enum' },
  { id: 'json(data)', label: 'json(data)', category: 'enum' },
  { id: 'map(enumerable, mapper)', label: 'map(enumerable, mapper)', category: 'enum' },
  { id: 'parse_json(data)', label: 'parse_json(data)', category: 'enum' },
  { id: 'reduce(enumerable, accumulator, reducer)', label: 'reduce(enumerable, accumulator, reducer)', category: 'enum' },
  { id: 'reject(enumerable, reject_fun)', label: 'reject(enumerable, reject_fun)', category: 'enum' },
  { id: 'sort_by(enumerable, sorter_fun)', label: 'sort_by(enumerable, sorter_fun)', category: 'enum' },
  { id: 'uniq(enumerable)', label: 'uniq(enumerable)', category: 'enum' },
  { id: 'with_index(enumerable)', label: 'with_index(enumerable)', category: 'enum' },
  // Logical functions
  { id: 'and(argument1, argument2, argument3)', label: 'and(argument1, argument2, argument3)', category: 'logical' },
  { id: 'if(condition, yes, no)', label: 'if(condition, yes, no)', category: 'logical' },
  { id: 'is_error(value)', label: 'is_error(value)', category: 'logical' },
  { id: 'is_nil_or_empty(arg)', label: 'is_nil_or_empty(arg)', category: 'logical' },
  { id: 'isbool(var)', label: 'isbool(var)', category: 'logical' },
  { id: 'isnumber(var)', label: 'isnumber(var)', category: 'logical' },
  { id: 'isstring(binary)', label: 'isstring(binary)', category: 'logical' },
  { id: 'not(argument)', label: 'not(argument)', category: 'logical' },
  { id: 'or(argument1, argument2, argument3)', label: 'or(argument1, argument2, argument3)', category: 'logical' },
  { id: 'switch(argument1, argument2, argument3)', label: 'switch(argument1, argument2, argument3)', category: 'logical' },
  // Data / Examples
  { id: 'attachment_url(media_id)', label: 'attachment_url(media_id)', category: 'data' },
  { id: 'close_chat()', label: 'close_chat()', category: 'data' },
  { id: 'cull_data()', label: 'cull_data()', category: 'data' },
  { id: 'cull_data(%)', label: 'cull_data(%)', category: 'data' },
  { id: 'generate_ott(data)', label: 'generate_ott(data)', category: 'data' },
  { id: 'get_collected_data()', label: 'get_collected_data()', category: 'data' },
  { id: 'get_write_results_data()', label: 'get_write_results_data()', category: 'data' },
  { id: 'scrub_message_by_id(id)', label: 'scrub_message_by_id(id)', category: 'data' },
  { id: 'scrub_session_messages()', label: 'scrub_session_messages()', category: 'data' },
  // Integrations
  { id: 'hf_connect(model_resource, token)', label: 'hf_connect(model_resource, token)', category: 'integrations' },
  { id: 'hf_infer(hf_connect, query)', label: 'hf_infer(hf_connect, query)', category: 'integrations' },
  { id: 'google_connect(service_account)', label: 'google_connect(service_account)', category: 'integrations' },
  { id: 'google_read_sheet(token, spreadsheet_id, sheet_name, cache_ttl)', label: 'google_read_sheet(token, spreadsheet_id, sheet_name, cache_ttl)', category: 'integrations' },
  { id: 'attachment_url(media_id, ttl)', label: 'attachment_url(media_id, ttl)', category: 'integrations' },
  { id: 'openai_add_function(connection, name, description, parameters)', label: 'openai_add_function(connection, name, description, parameters)', category: 'integrations' },
  { id: 'openai_add_image(connection, role, prompt, image_url)', label: 'openai_add_image(connection, role, prompt, image_url)', category: 'integrations' },
  { id: 'openai_add_image(connection, role, prompt, image_url, max_tokens)', label: 'openai_add_image(connection, role, prompt, image_url, max_tokens)', category: 'integrations' },
  { id: 'openai_add_message(connection, role, content)', label: 'openai_add_message(connection, role, content)', category: 'integrations' },
  { id: 'openai_add_messages(connection, role, messages)', label: 'openai_add_messages(connection, role, messages)', category: 'integrations' },
  { id: 'openai_chat_completion(connection)', label: 'openai_chat_completion(connection)', category: 'integrations' },
  { id: 'openai_connect(token, model)', label: 'openai_connect(token, model)', category: 'integrations' },
  { id: 'monotonic_time()', label: 'monotonic_time()', category: 'integrations' },
  { id: 'time_elapsed(start_time)', label: 'time_elapsed(start_time)', category: 'integrations' }
];

export function filterExpressions(query) {
  const q = (typeof query === 'string' ? query : '').toLowerCase().trim();

  const isContactQuery =
    !q ||
    q === 'contact' ||
    q.startsWith('contact ') ||
    q.startsWith('contact.');

  if (isContactQuery) {
    const remainder =
      !q || q === 'contact' || q === 'contact ' || q === 'contact.'
        ? ''
        : q.replace(/^contact\.?/, '').trim();
    return toContactSuggestions(remainder);
  }

  return FUNCTION_SUGGESTIONS.filter(
    (item) =>
      item.label.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)
  );
}

export { FUNCTION_SUGGESTIONS };
