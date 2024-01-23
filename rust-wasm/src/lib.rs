use proc_macro2::Span;
use serde::Serialize;
use syn::spanned::Spanned;
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
pub struct RsPosition {
  pub line: usize,
  pub column: usize,
}

#[derive(Serialize)]
pub struct RsNode {
  pub name: String,
  pub start: RsPosition,

  pub end: RsPosition,
}

impl Into<String> for RsNode {
  fn into(self) -> String {
    return serde_json::to_string(&self).unwrap();
  }
}

fn is_item_in_range(span: Span, focus_line: usize) -> bool {
  let start = span.start().line;
  let end = span.end().line;

  end >= focus_line && start <= focus_line
}

// impl RsNode for WasmDescribe {}
fn determine_range(span: Span, sig_ident: String, focus_line: usize) -> Option<RsNode> {
  let start = span.start().line;
  let end = span.end().line;

  if is_item_in_range(span, focus_line) {
    let start = RsPosition {
      line: start,
      column: span.start().column,
    };
    let end = RsPosition {
      line: end,
      column: span.end().column,
    };

    return Some(RsNode {
      name: sig_ident.clone(),
      start: start,
      end: end,
    });
  }
  None
}

fn for_each_impl_items(items: Vec<syn::ImplItem>, focus_line: usize) -> Option<RsNode> {
  for item in items {
    match item {
      syn::ImplItem::Fn(item) => {
        if let Some(range) = determine_range(item.span(), item.sig.ident.to_string(), focus_line) {
          return Some(range);
        }
      }
      _ => {}
    }
  }
  None
}

#[wasm_bindgen]
pub fn rust2ast(code: &str, focus_line: usize) -> Option<String> {
  let ast_result = syn::parse_str::<syn::File>(code);
  if ast_result.is_err() {
    return None;
  }
  let ast = ast_result.unwrap();

  for item in ast.items {
    match item {
      syn::Item::Fn(item) => {
        if let Some(range) = determine_range(item.span(), item.sig.ident.to_string(), focus_line) {
          return Some(range.into());
        }
      }
      syn::Item::Impl(item) => {
        if is_item_in_range(item.span(), focus_line) {
          if let Some(range) = for_each_impl_items(item.items, focus_line) {
            return Some(range.into());
          }
        }
      }
      _ => {}
    }
  }
  None
}

#[test]
fn test() {
  let code = r#"
  const sex: string = "";

  pub fn hello() {}
  pub fn rust2ast(code: &str) -> String {
    let ast_result = syn::parse_str::<syn::File>(code);
    match ast_result {
      Ok(ast) => format!("{:#?}", ast),
      Err(e) => {
        format!("Error: {}", e)
      }
    }
  }

  impl Ctx {
    pub fn new(user_id: u64) -> Self {
      Self { user_id }
    }
  }
  "#;

  let result = rust2ast(code, 15);
  assert!(result.is_some())
}
